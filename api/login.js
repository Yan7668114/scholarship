// Required modules
const router = require('express').Router();
const util = require("./../utilities/utilities_main.js");
const jwt = require('jsonwebtoken');

router.post("/", async function(req, res) {
    try {
        const account = req.body.account;
        const password = req.body.password;
        // 
        let conn;
	    try {
	    	conn = await util.getDBConnection(); // get connection from db
	    	const result = await conn.query("SELECT COUNT(*) FROM user WHERE username = ? AND pass = ?;", [account, password]);
            if (result[0]["COUNT(*)"]) {
                // valid user, create a token
                const data = {uid : account};
                const token = util.signJwtToken(data);
                res.cookie("token", token);
                res.json({suc : true});
            }
            else {
                res.json({suc : false, msg : "wrong username or password"});
            }
	    }
	    catch(e) {
            console.error(e);
            res.json({suc : false});
	    }
	    finally {
		    util.closeDBConnection(conn); // close db connection
	    }
    }
    catch(e) {
        console.log(e);
    }
})

module.exports = router;