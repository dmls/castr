import { openDatabase } from 'expo-sqlite';
import { CollectionsSchema, MembersSchema } from './Schema';

class SQLiteDB {
  constructor() {
    this.db = this.openDatabase();
    this.createTables();
  }

  openDatabase() {
    return openDatabase('castr');
  }

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

  async getTable(table) {
    const result = await this.execSqlAsync(`SELECT * FROM ${table}`);
    
    return result.rows;
  }

  async getById(table, id) {
    const result = await this.execSqlAsync(`SELECT * FROM collections WHERE id = ?`, [id]);
    
    return result.rows[0];
  }

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

  async add(table, data) {
    return await this.addUpdate(table, data, 'add');
  }

  async update(table, id, data) {
    return await this.addUpdate(table, data, 'update', id);
  }

  async deleteCollection(id) {
    await this.execSqlAsync(`DELETE FROM collections WHERE id = ?`, [id]);
    await this.execSqlAsync(`DELETE FROM members WHERE collection_id = ?`, [id]);
    
    return true;
  }

  async delete(table, id) {
    const result = await this.execSqlAsync(`DELETE FROM ${table} WHERE id = ?`, [id]);
    
    return result.rowsAffected === 1;
  }

  async getMembers(collection_id) {
    const result = await this.execSqlAsync(`SELECT * FROM members where collection_id = ?`, [collection_id]);

    return result.rows;
  }
}

const db = new SQLiteDB();

export default db;
