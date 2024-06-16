// Required modules
const router = require('express').Router();
const util = require("./../utilities/utilities_main.js");
const moment = require("moment");

router.get("/", async function(req, res) {
    try {
        let conn;
	    try {
	    	conn = await util.getDBConnection(); // get connection from db
	    	const query = `          //語法有問題
            SELECT           
                item_form.application_id, 
                item_form.item_info_id, 
                item_form.application_unit, 
                item_form.subsidy,
                scholarship_application.application_date,
                scholarship_application.student_id, 
                student.student_name    
            FROM 
                item_form
            RIGHT JOIN 
                scholarship_application ON item_form.application_id = scholarship_application.application_id;
            RIGHT JOIN 
                student ON scholarship_application.student_id = student.student_id;
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
        let conn;
	    try {
            console.log(req.body);
            // data
            const apply_infos = req.body.apply_infos; // get data from request
            const time = moment(new Date()).format("YYYY-MM-DD");

            if (!assistant_id) {
                throw new Error("Assistant ID is missing in the request body.");
            }   

	    	conn = await util.getDBConnection(); // get connection from db
            await conn.beginTransaction();

            // insert data into table : scholarship_application
            const scholarship_audit_info = await conn.batch("INSERT INTO audit_form(``, ``) VALUES(?, ?);", [time, req.body.student_id]);
            const scholarship_audit_id = scholarship_audit_info.insertId; // get the application_id of previous record
            

            console.log(scholarship_audit_info.insertId);
            console.log(apply_infos);
            
            // insert each apply item into item_form
            for (let i = 0;i < apply_infos.length;i++) {
                await conn.batch("INSERT INTO item_form(`application_id`, `item_info_id`, `application_unit`, `subsidy`) VALUES(?, ?, ?, ?);", [scholarship_application_id, apply_infos[i], application_unit, subsidy]);
            }
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