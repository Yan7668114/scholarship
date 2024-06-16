/*
// 引入 mysql 模組
var mysql = require('mysql');
// 建立連線
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'wang',
  password: 'wang313',
  database: 'scholarship'
});

connection.connect();
//使用 callback 來接收訊息: 連線成功就印出 todos 所有欄位
connection.query('SELECT * from advisor', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

connection.end();

module.exports = connection;
*/

// require module
const jwt = require('jsonwebtoken');
const db = require("mariadb");

// create pool
const pool = db.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'user',
    password : '',
    database : 'scholarship'
});

module.exports = {
  // return connection of db
  getDBConnection : async function() {
    try {
        const conn = await pool.getConnection();
        return conn;
    }
    catch(e) {
        console.error("error getting db connection : ", e);
        return null;
    }
  },

  // close connection of db
  closeDBConnection : function(conn) {
    try {
        conn.release();
    }
    catch(e) {
        console.error("error closing db connection : ", e);
    }
  }
}