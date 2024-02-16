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

  async execSQLAsync(query, args = []) {
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
    const result = await this.execSQLAsync(`SELECT * FROM ${table}`);
    return result.rows;
  }

  async getCollection(id) {
    const result = await this.execSQLAsync(`SELECT * FROM collections WHERE id = ?`, [id]);
    
    return result.rows[0];
  }

  async createCollection(data) {
    const { name, image } = data;
    
    const result = await this.execSQLAsync(`INSERT INTO collections (name, image) VALUES (?, ?)`, [name, image]);
    
    return await this.getCollection(result.insertId);
  }

  async deleteCollection(id) {
    const result = await this.execSQLAsync(`DELETE FROM collections WHERE id = ?`, [id]);

    return true;
  }
}

const db = new SQLiteDB();

export default db;
