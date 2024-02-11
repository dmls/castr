import * as SQLite from 'expo-sqlite';
import { CollectionsSchema, MembersSchema } from './Schema';

class SQLiteDB {
  constructor() {
    this.db = this.openDatabase();
    this.createTables();
  }

  openDatabase() {
    return SQLite.openDatabase('castr');
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
        console.log('Tables created successfully');
      }
    );
  }

  async transactionWrap(callback) {
    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) => {
          try {
            callback(tx, resolve, reject);
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          resolve();
        }
      );
    });
  }

  async getTable(table) {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM ${table}`, [], (_, { rows }) => {
          console.log('Rows:', rows);
          resolve(rows.raw());
        });
      });
    });
  }

  async createCollection(data) {
    const { name, image } = data;
    
    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) => tx.executeSql(`INSERT INTO collections (name, image) VALUES (?, ?)`, [name, image], (_, result) => resolve(result.insertId), reject),
        reject,
        () => {}
      );
    });
  }
}

const db = new SQLiteDB();

export default db;
