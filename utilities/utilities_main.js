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

// global variable
const jwt_key = "goodjwtkey";

module.exports = {
    // shared variable
    jwt_key,

    // shared function

    signJwtToken: function(data) {
        try {
            const result = jwt.sign({ data, exp: Math.floor(Date.now() / 1000) + (60 * 15) }, jwt_key);
            return result;
        }
        catch (e) {
            console.log(e);
        }
    },

    authenToken: function(token) {
        return new Promise((resolve, reject) => {
            try {
                const data = jwt.verify(token, jwt_key).data;
                if (data.uid) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (error) {
                console.error(error);
                resolve(false);
            }
        });
    },

    loginAuthentication: function(account, password) {
        return new Promise((resolve, reject) => { // 包裝成 Promise
            const spawn = require("child_process").spawn;
            const pythonScript = path.join(__dirname, 'catch.py'); // path/to/catch.py
            const pythonProcess = spawn('python', [pythonScript, account, password]);

            //console.log(`account: ${account}`);
            //console.log(`password: ${password}`);

            pythonProcess.stdout.on('data', (data) => {
		        data = data.toString().slice(0, -1); // remove the last char 
                if (data === 'login falied') {
                    resolve(false); // 登入失敗，解析 Promise 為 True
                } else {
                    resolve(data.toString().trim()); // 登入成功
                }
            });

            pythonProcess.stderr.on('data', (data) => {
                console.error(`stderr: ${data.toString()}`);
            });

            pythonProcess.on('exit', (code) => {
                //console.log(`child process exited with code ${code}`);
                if (code !== 0) {
                    reject(new Error(`child process exited with code ${code}`)); // 非 0 退出代碼表示錯誤
                }
            });

            pythonProcess.on('error', (err) => {
                console.error(err);
                reject(err); // 子進程啟動失敗
            });
        });
    },
    
    // get parent absolute path
    getParentPath : function(dir) {
        try {
            n_dir = "";
            dir = dir.split("");
            // determine the type of slash, which will be different between windows and linux
            if (dir.includes("/")) {
                slash_type = "/";
            }
            else {
                slash_type = "\\";
            }
            // pop the last one directory
            while (dir.pop() != "\\") {
                // pass
            }
            // restructure the full path
            for (let i = 0;i < dir.length;i++) {
                n_dir += dir[i];
            }
            return n_dir;
        }
        catch(e) {
            console.log(e);
        }
    },

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
