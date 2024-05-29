const router = require('express').Router();
const util = require("./../utilities/utilities.js");

// processing request
router.get('/', async function(req, res) {
    try {
	    res.sendFile(util.getParentPath(__dirname) + '/templates/login.html');
    }
    catch(e) {
        console.log(e);
    }
    return;
});

module.exports = router;
