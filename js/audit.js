
let item_info_len = 0;
let all_audit_data = null;
let current_review_apllication_id;
const application_detail_init_table_content = document.getElementById("application_detail").innerHTML;
let assistant_s_num;
let assistant_name;

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

function combineSameAppData(data) {
    // combine the same application id data in a same record
    let n_data = {};
    let next_record = true;
    for (let i = 0; i < data.length; i++) {
        if (i > 0 && data[i].application_id != data[i-1].application_id) {
            // this record is different from the last
            next_record = true;
        }
        if (next_record) {
            // this is new record
            next_record = false;
            // init this record
            n_data[data[i].application_id] = {};
            n_data[data[i].application_id].application_id = data[i].application_id;
            n_data[data[i].application_id].application_date = data[i].application_date;
            n_data[data[i].application_id].student_id = data[i].student_id;
            n_data[data[i].application_id].student_name = data[i].student_name;
            n_data[data[i].application_id].application_units = [data[i].application_unit];
            n_data[data[i].application_id].item_contents = [data[i].item_content];
            n_data[data[i].application_id].subsidys = [data[i].subsidy];
        }
        else {
            n_data[data[i].application_id].application_units.push(data[i].application_unit);
            n_data[data[i].application_id].item_contents.push(data[i].item_content);   
            n_data[data[i].application_id].subsidys.push(data[i].subsidy);
        }
    }
    all_audit_data = n_data;
    return n_data;
}

function auditCase(application_id) {
    current_review_apllication_id = application_id;

    // add item content
    const table_id = "application_detail";
    document.getElementById(table_id).innerHTML = application_detail_init_table_content;
    let table_content = document.getElementById(table_id).innerHTML;
    const data = all_audit_data[application_id]; 
    console.log(data);
    table_content += "<tr>";
    for (let i = 0;i < data.item_contents.length;i++) {
        if (data.item_contents[i].includes("已向")) {
            table_content += 
            `
                <td>${data.item_contents[i]} ，申請單位: ${data.application_units[i]} 獲得補助金額：NT$${data.subsidys[i]}</td>
            `
        }
        else {
            table_content += 
            `
            </tr>
            <tr>
                <td>${data.item_contents[i]}</td>
            `
        }
    }
    document.getElementById(table_id).innerHTML = table_content; 

    // add simple info
    document.getElementById("application_info").innerHTML = 
    `
    申請編號：${data.application_id} <br/>
    申請日期：${data.application_date} <br/>
    申請人姓名：${data.student_name} <br/>
    申請人學號：${data.student_id} <br/>
    申請內容：
    `;

    console.log();
}

async function putDataInTable(table_id) {
    // get data
    const result = await getItemInfo();
    const data = combineSameAppData(result.data);
    const suc = result.success;
    if (suc && data != null && table_id != null) {
        // insert data into table
        let table_content = document.getElementById(table_id).innerHTML;
        
        const keys = (Object.keys(data));
        let next_record = false;
        let this_application_info = {};
        console.log(data);
        for (let i = 0; i < keys.length; i++) {
            table_content += 
            `
            <tr>
            <td>${data[keys[i]].application_id}</td>
            <td>${data[keys[i]].application_date}</td>
            <td>${data[keys[i]].student_id}</td>
            <td>${data[keys[i]].student_name}</td>
            <td><button id="audit_bt_${data[keys[i]].application_id}" onclick="auditCase(${data[keys[i]].application_id})">處理<br/>申請</button></td>
            </tr>
            `
            ; 
        }
        /*
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
        */
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
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    assistant_s_num = urlParams.get("s_num");
    assistant_name = urlParams.get("name");
    document.getElementById("assistant_name").innerHTML = assistant_name;
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

async function sendReviewResult() {
    // send current review result of the application
    console.log(`send current review result of the application ${current_review_apllication_id}`);
    let data = {assistant_s_num, "application_id" : current_review_apllication_id};

    // 你們這邊要將編號為 current_review_apllication_id 的審核表的資料送去後端處理
    const doc_missing = document.getElementById("doc_checkbox_no").checked;

    if (doc_missing) {
        data["documents_ready"] = document.getElementById("missing_docs").value;
    }
    
    const is_passed = document.getElementById("passed").checked;
    data["committee_review"] = is_passed;
    if (is_passed) {
        data["meeting_name"] = document.getElementById("passedTimes").value;
        data["scholarship_amount"] = document.getElementById("scholarshipAmount").value;
        data["passed_date"] = document.getElementById("passed_date").value;
    }

    console.log(data);
    const result = await axios.post("/api/audit", data);
    if (result.data.suc) {
        alert("審核成功！");
    }
    else {
        alert("審核失敗！", result.data.msg);
    }
    window.location.reload();
}

setAssistantName();
putDataInTable("application_table");