// // 先從 model 引入 todos 資料
// const todoModel = require('../models/todo')

// const todoController = {
//   getAll: (req, res) => {
//     // 改成 callback 非同步操作
//     todoModel.getAll((err, results) => {
//       // 如果有 err 就印出錯誤訊息
//       if (err) return console.log(err);
//       // 不然就把 todos 傳給 view
//       res.render('todos', {
//         todos: results
//       })
//     })
//   },

//   get: (req, res) => {
//     const id = req.params.id
//     todoModel.get(id, (err, results) => {
//       if (err) return console.log(err);
//       res.render('todos', {
//         // 注意回傳的結果 array，必須取 results[0] 才會是一個 todo
//         todos: results[0]
//       })
//     })
//   }
// }

// module.exports = todoController