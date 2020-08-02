import mysql from 'mysql';
import logger from '../utils/logger';
import config from '../config/mysql.conf';
import { userTable } from '../sqls/create';

// function initDB(): Connection {
//   const connection = mysql.createConnection(config);
//   connection.connect((err) => {
//     if (err) {
//       logger.log('red', `mysql connect error: ${err}`)
//       process.exit(1);
//     }
//     logger.log('green', `connection success: threadId: ${connection.threadId}`)
//   });
//   return connection;
// }
const pool = mysql.createPool(config);


export function query(sql: string, values?: unknown): Promise<unknown> {
  return new Promise((resolve, reject) => {
    //  connect on peer request
    // initDB().query(sql, values, (err, results) => {
    //   if (err) {
    //     return reject(err);
    //   }
    //   resolve(results);
    // })
    // pool manage
    pool.getConnection((err, connect) => {
      if (err) reject(err);
      connect.query(sql, values, (err, rows) => {
        connect.release();
        if (err) reject(err);
        return resolve(rows)
      })
    })
  })
}


export function createTable(sql: string): void {
  const connection = mysql.createConnection(config);
  connection.connect((err) => {
    if (err) {
      return logger.log('red', `mysql connect error: ${err}`);
    }
    logger.log('green', `connection success: threadId: ${connection.threadId}`)

    connection.query(sql);
    connection.end((err) => {
      if (err) return logger.log('red', `mysql connect error: ${err}`);
      logger.log('green', 'create table success')
    });
  })

}

createTable(userTable);
