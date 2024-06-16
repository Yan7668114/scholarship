//基於 Node.js Express 的主要設定檔
const express = require('express');
const db = require('./db')
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const server = require('http').Server(app);

// //bodyParser: 解析 HTTP 請求的 body
app.use(bodyParser.urlencoded({ extended: false }));
// //express.json: 處理 JSON 資料
app.use(express.json());
app.use(cookieParser()); //解析 HTTP 請求的 cookie

// // routing
// // pages
+app.use("/example", require("./pages/example.js"));
+app.use("/main", require("./pages/main.js"));
+app.use("/login", require("./pages/login.js"));
+app.use("/apply", require("./pages/apply.js"));
+app.use("/audit", require("./pages/audit.js"));

// // api
app.use("/api/login", require("./api/login.js"));
app.use("/api/example", require("./api/example.js"));
app.use("/api/main", require("./api/main.js"));
app.use("/api/audit", require("./api/audit.js"));
// // static files
app.use('/js', express.static('./js'));
app.use('/css', express.static('./css'));

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







