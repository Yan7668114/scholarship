// Required modules
const router = require('express').Router();
const util = require("./../utilities/utilities_main.js");
const moment = require("moment");

router.get("/", async function(req, res) {
    try {
        let conn;
	    try {
	    	conn = await util.getDBConnection(); // get connection from db
	    	const result = await conn.query("SELECT item_content FROM item_info;");
            res.json(result);
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
            const application_units = req.body.application_units;
            const subsidy_amounts = req.body.subsidy_amounts;
            const student_id = req.body.student_id;
            const student_name = req.body.student_name;
            const department_and_grade = req.body.department_and_grade;
            const advisor_id = req.body.advisor_name;
            const time = moment(new Date()).format("YYYY-MM-DD");

            if (!student_id) {
                throw new Error("Student ID is missing in the request body.");
            }   

	    	conn = await util.getDBConnection(); // get connection from db
            await conn.beginTransaction();

            // insert into student, if not existed
            const stu_existed = await conn.query("SELECT COUNT(*) FROM student WHERE student_id=?", student_id);
            if (!stu_existed[0]["COUNT(*)"]) {
                await conn.batch("INSERT INTO student VALUES(?, ?, ?, ?);", [student_id, department_and_grade, student_name, advisor_id]);
            }
            // insert data into table : scholarship_application
            const scholarship_application_info = await conn.batch("INSERT INTO scholarship_application(`application_date`, `student_id`) VALUES(?, ?);", [time, student_id]);
            const scholarship_application_id = scholarship_application_info.insertId; // get the application_id of previous record
            
            // 這邊你們要再改
            // const application_unit = "test unit"; 
            // const subsidy = 1000;

            console.log(scholarship_application_info.insertId);
            console.log(apply_infos);
            
            // insert each apply item into item_form
            for (let i = 0;i < apply_infos.length;i++) {
                await conn.batch("INSERT INTO item_form(`application_id`, `item_info_id`, `application_unit`, `subsidy`) VALUES(?, ?, ?, ?);", [scholarship_application_id, apply_infos[i], application_units[i], subsidy_amounts[i]]);
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