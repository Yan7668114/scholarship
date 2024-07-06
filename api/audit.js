// Required modules
const router = require('express').Router();
const util = require("./../utilities/utilities_main.js");
const moment = require("moment");

router.get("/", async function(req, res) {
    try {
        let conn;
	    try {
	    	conn = await util.getDBConnection(); // get connection from db
	    	const query = 
            `
            SELECT item_form.application_id, item_form.item_info_id, item_info.item_content,
                item_form.application_unit, 
                item_form.subsidy,
                scholarship_application.application_date,
                scholarship_application.student_id, 
                student.student_name    
            FROM 
                item_form
            RIGHT JOIN 
                scholarship_application ON item_form.application_id = scholarship_application.application_id
            LEFT JOIN 
                student ON scholarship_application.student_id = student.student_id
            LEFT JOIN
                item_info ON item_form.item_info_id = item_info.item_info_id
            ;
            `;
            const result = await conn.query(query);
            res.json({ success: true, data: result });
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

router.post("/", async function(req, res) {
    try {
        if (req.body.assistant_s_num.length >= 9) {
            return res.json({suc : false, msg : "invalid credentials"})
        }
        let conn;
	    try {
            console.log(req.body);
            // check the user is assitant
            const time = moment(new Date()).format("YYYY-MM-DD");

	    	conn = await util.getDBConnection(); // get connection from db
            await conn.beginTransaction();

            // insert data into table : scholarship_application
            const data = [req.body.assistant_s_num, req.body.application_id, req.body.documents_ready, req.body.committee_review, req.body.meeting_name, req.body.passed_date, req.body.scholarship_amount];
            const scholarship_audit_info = await conn.batch("INSERT INTO audit_form(`assistant_id`, `application_id`, `documents_ready`, `committee_review`, `meeting_name`, `passed_date`, `scholarship_amount`) VALUES(?, ?, ?, ?, ?, ?, ?);", data);
            await conn.commit();

            res.json({suc : true});
	    }
	    catch(e) {
            console.error(e);
            await conn.rollback();
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