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

  async add(table, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const placeholders = Array.from({ length: keys.length }, (_, i) => `?`).join(', ');
    const query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;

    const result = await this.execSqlAsync(query, values);

    return await this.getById(table, result.insertId);
  }

  async deleteCollection(id) {
    const result = await this.execSqlAsync(`DELETE FROM collections WHERE id = ?`, [id]);

    return true;
  }

  async getMembers(collection_id) {
    const result = await this.execSqlAsync(`SELECT * FROM members where collection_id = ?`, [collection_id]);

    return result.rows;
  }
}

const db = new SQLiteDB();

export default db;
