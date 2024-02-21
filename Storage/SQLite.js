import { openDatabase } from 'expo-sqlite';
import { CollectionsSchema, MembersSchema } from './Schema';

class SQLiteDB {
  constructor() {
    this.db = this.openDatabase();
    this.createTables();
  }

  /**
   * Open SQLite database connection.
   *
   * @returns {Object} SQLite database instance.
   */  
  openDatabase() {
    return openDatabase('castr');
  }

  /**
   * Create necessary tables in the database.
   */
  createTables() {
    this.db.transaction(
      (tx) => {
        tx.executeSql(CollectionsSchema, []);
        tx.executeSql(MembersSchema, []);
      },
      (error) => {
        console.error('Error creating tables:', error);
      },
      () => {
        // console.log('Tables created successfully');
      }
    );
  }

  /**
   * Execute SQL query asynchronously and return the result.
   *
   * @param {string} query - SQL query to be executed.
   * @param {Array} args - Query arguments.
   *
   * @returns {Promise} - Promise resolving to the query result.
   */
  async execSqlAsync(query, args = []) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.db.transactionAsync(async tx => {
          const result = await tx.executeSqlAsync(query, args);
          resolve(result);
        });
      } catch (error) {
        console.log(error);
        reject(false);
      }
    });
  }

  /**
   * Retrieve all records from a specified table.
   *
   * @param {string} table - Name of the table.
   *
   * @returns {Array} - Array of records from the table.
   */
  async getTable(table) {
    const result = await this.execSqlAsync(`SELECT * FROM ${table}`);

    return result.rows;
  }

  /**
   * Retrieve a record by ID from a specified table.
   * 
   * @param {string} table - Name of the table.
   * @param {number} id - ID of the record.
   *
   * @returns {Object} - Retrieved record.
   */
  async getById(table, id) {
    const result = await this.execSqlAsync(`SELECT * FROM collections WHERE id = ?`, [id]);

    return result.rows[0];
  }

  /**
   * Add or update a record in the specified table.
   *
   * @param {string} table - Name of the table.
   * @param {Object} data - Data to be added or updated.
   * @param {string} action - Action to perform ('add' or 'update').
   * @param {number} updateId - ID of record to update.
   *
   * @returns {Object} - Added or updated record.
   */
  async addUpdate(table, data, action, updateId = null) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    let query;
    if (action === 'add') {
      const placeholders = Array.from({ length: keys.length }, (_, i) => `?`).join(', ');
      query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;
    } else if (action === 'update') {
      if (!updateId) {
        throw new Error('updateId is required for update action.');
      }
      const setClauses = keys.map((key) => `${key} = ?`).join(', ');
      query = `UPDATE ${table} SET ${setClauses} WHERE id = ${updateId}`;
    } else {
      throw new Error('Invalid action. Use "add" or "update".');
    }

    const result = await this.execSqlAsync(query, values);

    const getId = action === 'add' ? result.insertId : updateId;
    return await this.getById(table, getId);
  }

  /**
   * Add a record to the specified table.
   *
   * @param {string} table - Name of the table.
   * @param {Object} data - Data to be added.
   *
   * @returns {Object} - Added record.
   */
  async add(table, data) {
    return await this.addUpdate(table, data, 'add');
  }

  /**
   * Update a record in the specified table.
   *
   * @param {string} table - Name of the table.
   * @param {number} id - ID of the record to be updated.
   * @param {Object} data - Data to be updated.
   *
   * @returns {Object} - Updated record.
   */
  async update(table, id, data) {
    return await this.addUpdate(table, data, 'update', id);
  }

  /**
   * Delete a collection and its associated members.
   *
   * @param {number} id - ID of the collection to be deleted.
   *
   * @returns {boolean} - True if deletion is successful, otherwise false.
   */
  async deleteCollection(id) {
    await this.execSqlAsync(`DELETE FROM collections WHERE id = ?`, [id]);
    await this.execSqlAsync(`DELETE FROM members WHERE collection_id = ?`, [id]);

    return true;
  }

  /**
   * Delete a record from the specified table.
   *
   * @param {string} table - Name of the table.
   * @param {number} id - ID of the record to be deleted.
   *
   * @returns {boolean} - True if deletion is successful, otherwise false.
   */
  async delete(table, id) {
    const result = await this.execSqlAsync(`DELETE FROM ${table} WHERE id = ?`, [id]);

    return result.rowsAffected === 1;
  }

  /**
   * Retrieve members of a specific collection.
   *
   * @param {number} collection_id - ID of the collection.
   *
   * @returns {Array} - Array of member records.
   */
  async getMembers(collection_id) {
    const result = await this.execSqlAsync(`SELECT * FROM members where collection_id = ?`, [collection_id]);

    return result.rows;
  }
}

const db = new SQLiteDB();

export default db;
