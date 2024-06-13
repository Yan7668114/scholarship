const router = require('express').Router();
const { error } = require('console');
const util = require("./../utilities/utilities_main.js");

// processing request
router.get('/', async function(req, res) {
    try {
	    res.sendFile(util.getParentPath(__dirname) + '/templates/main.html');
    }
    catch(e) {
        console.log(e);
        res.json({error_msg : "failed to access the file"});
    }
    return;
});

module.exports = router;
