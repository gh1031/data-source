import mysql, { Connection } from 'mysql';
import chalk from 'chalk';
import config from '../config/db.conf';
import { userTable } from '../sql/create';

function initDB(): Connection {
  const connection = mysql.createConnection(config);
  connection.connect((err) => {
    if (err) {
      return chalk.red(`mysql connect error: ${err}`);
    }
    chalk.green(`connection success: ${connection.threadId}`)
  });
  return connection;
}


export function query(sql: string, values?: unknown): Promise<unknown> {
  return new Promise((resolve, reject) => {
    initDB().query(sql, values, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    })
  })
}


export function createTable(sql: string): Promise<unknown> {
  return query(sql)
}

createTable(userTable);
