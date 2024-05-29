// // 引入 db，也就是 connection
// const db = require('../db')

// const todoModel = {
//   // 這裡要用 callback 來拿取資料
//   getAll: (cb) => {
//     db.query(
//       'SELECT * FROM todos', (err, results) => {
//       if (err) return cb(err);
//       // cb: 第一個參數為是否有錯誤，沒有的話就是 null，第二個才是結果
//       cb(null, results)
//     });
//   },

//   get: (id, cb) => {
//     db.query(
//       'SELECT * FROM todos WHERE id = ?', [id], (err, results) => {
//         if (err) return cb(err);
//         cb(null, results)
//       });
//   }
// }

// module.exports = todoModel