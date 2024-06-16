let item_info_len = 0;

async function getItemInfo() {
    // get the data from table : item_info
    try {
        let result = await axios.get('/api/audit');
        result = result.data;
        return result;
    }
    catch (e) {
        console.error(e);
        return null;
    }
}

async function putDataInTable(table_id) {
    // get data
    const data = await getItemInfo();
    if (data != null && table_id != null) {
        // insert data into table
        let table_content = document.getElementById(table_id).innerHTML;
        
        for (let i = 0; i < data.length; i++) {
            
            table_content += `
            <tr>
                <td>${data[i].item_content}</td>
                <br>
            </tr>`; 
        }
        `<h2>證明文件是否備齊</h2>
            <div>
                <label>
                <input type="radio"  id="checkbox_yes_${i}" value="yes"/> 是
                </label>
                <label>
                <input type="radio"  id="checkbox_no_${i}" value="no"/> 否
                </label>
                ，尚須補繳：<input type="text" id="unit_${i}"/>
            </div>
	
		<h2>學生事務委員會審核結果</h2>
				<div>
					
					<input type="radio" id="passed" value="passed">
					<label >經</label>
					會議名稱("學期-次數"):<input type="text" id="passedTimes" style="width: 50px;">，核發獎學金
					<input type="number" id="scholarshipAmount" style="width: 100px;">元
					<br>
					
	
					
					<blockquote>
						<div >
						<label>通過日期：</label>
						<input type="date" id="passed_date">
						</div>
					</blockquote>
					
					
				</div>
				<div>
					<input type="radio" id="notPassed" value="notPassed">
					<label>未通過</label>
				</div>
				<br>
				<div>
					<label for="noSupportProof"> 未獲補助證明檔案繳交處：</label>
					<input type="file" id="noSupportProof" accept=".pdf, .doc, .docx, .jpg, .jpeg, .png">
					
				</div>
				<br></br>
        `
        // write back data into table
        document.getElementById(table_id).innerHTML = table_content; 
        // set info length
        item_info_len = data.length;   
    }
    else {
        console.error("data and table id can not be null");
    }
}

async function setAssistantName() {
    // get student name, and show on page
    document.getElementById("assistant_name").innerHTML = "test";
}

async function sendApplyData() {
    // get student name
    const student_name = document.getElementById("assistant_name").value;

    // get checked infos
    let apply_infos = [];
    let application_units = [];
    let subsidy_amounts = [];
    for (let i = 0; i < item_info_len; i++) {
        if (document.getElementById(`checkbox_${i}`).checked) {
            apply_infos.push(i + 1);
            // get unit、subsidy
            if (document.getElementById(`unit_${i}`) && document.getElementById(`subsidy_${i}`)) {
                application_units.push(document.getElementById(`unit_${i}`).value);
                subsidy_amounts.push(document.getElementById(`subsidy_${i}`).value);
            } else {
                application_units.push(null);
                subsidy_amounts.push(null);
            }
        }
    }

    const data = {student_id,student_name,department_and_grade, advisor_name, 
        apply_infos,
        application_units,
        subsidy_amounts
    };
    // send data
    let result = await axios.post('/api/main', data);
    console.log(result);
}

putDataInTable("info_item");