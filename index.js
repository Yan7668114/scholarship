//基於 Node.js Express 的主要設定檔
const express = require('express');
const db = require('./db')
const app = express();
// const bodyParser = require("body-parser");
// const cookieParser = require('cookie-parser');
// const server = require('http').Server(app);

// //bodyParser: 解析 HTTP 請求的 body
// app.use(bodyParser.urlencoded({ extended: false }));
// //express.json: 處理 JSON 資料
// app.use(express.json());
// app.use(cookieParser()); //解析 HTTP 請求的 cookie

// // routing
// // pages
// app.use("/main", require("./pages/main.js"));
// app.use("/login", require("./pages/login.js"));
// app.use("/apply", require("./pages/apply.js"));

// // api
// app.use("/api/login", require("./api/login.js"));
// // static files
// app.use('/js', express.static('./js'));
// app.use('/css', express.static('./css'));

// server.listen(5000, function () {
//     console.log('Node server is running..');
// });


const port = 5001;

// 如何處理不同的 request，參數分別為 url 和要執行的 function
app.get('/', (req, res) => {
    res.send('hello world!')
  })
  
  app.get('/bye', (req, res) => {
    res.send('bye!')
  })
  
  // 運行這個 port，參數分別為 port 和要執行的 function
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

// // 設定 view engine
// app.set('view engine', 'ejs')


// // 建立 todos data
// const todos = [
//     'first todo', 'second todo', 'third todo'
//   ]
  
// app.get('/todos', (req, res) => {
//     // 第二個參數可傳入資料
//     res.render('todos', {
//       todos     // todos: todos 一樣的話可省略寫法
//     })
// })

// // 加上 :id 代表不確定的參數
// app.get('/todos/:id', (req, res) => {
//     // params: 可拿到網址列上指定的參數
//     const id = req.params.id
//     const todo = todos[id]
//     res.render('todo', {
//       todo
//     })
// })

// app.get('/', (req, res) => {
//   //res.send('index')
// })

// app.get('/main.ejs', (req, res) => {
// // 叫 express 去 render views 底下叫做 hello 的檔案，副檔名可省略
//   //res.render('hello')
// })

// app.listen(port, () => {
//   console.log(`listening at http://localhost:${port}`)
// })


// // 引入 controller
// const todoController = require('./controllers/todo')

// app.set('view engine', 'ejs')

// const todos = [
//   'first todo', 'second todo', 'third todo'
// ]

// // 可直接使用 controller 的方法拿取資料和進行 render
// app.get('/todos', todoController.getAll)

// app.get('/todos/:id',)


// const todoController = require('./controllers/todo')

// app.set('view engine', 'ejs')

// app.get('/todos',)
// app.get('/todos/:id', todoController.get)

// app.listen(port, () => {
//   // 連線資料庫
//   db.connect()
//   console.log(`Example app listening at http://localhost:${port}`)
// })