/**
 * 创建mysql连接池，暴露查询接口
 */

const mysql = require('mysql');
const config = require('../../config/mysql.conf');

const pool = mysql.createPool(config);

function query(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connect) => {
      if (err) reject(err);

      connect.query(sql, values, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows);
        }
        
        connect.release();
      })
    })
  })
}

module.exports =  query;
