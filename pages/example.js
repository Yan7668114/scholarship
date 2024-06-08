const router = require('express').Router();
const { error } = require('console');
const util = require("./../utilities/utilities.js");

// processing request
router.get('/', async function(req, res) {
    try {
        res.sendFile(util.getParentPath(__dirname) + '/templates/example.html');  //回應靜態文件
    }
    catch(e) {
        console.log(e);
	    res.json({error_msg : "failed to access the file"});
    }
    return;
});

module.exports = router;
