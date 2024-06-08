let item_info_len = 0;

async function getItemInfo() {
    // get the data from table : item_info
    try {
        let result = await axios.get('/api/example');
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
        for (let i = 0;i < data.length;i++) {
            table_content += `<tr><td>${data[i].item_content}</td><td><input type='checkbox' id='checkbox_${i}'/></td></tr>`;
        }
        // write back data into table
        document.getElementById(table_id).innerHTML = table_content; 
        // set info length
        item_info_len = data.length;   
    }
    else {
        console.error("data and table id can not be null");
    }
}

async function setStudentName() {
    // get student name, and show on page
    document.getElementById("student_name").innerHTML = "test";
}

async function sendApplyData() {
    // get student name
    const student_name = document.getElementById("student_name").innerHTML;
    const student_id = document.getElementById("student_id").innerHTML;
    // get checked infos
    let apply_infos = [];
    for (let i = 0;i < item_info_len;i++) {
        if (document.getElementById(`checkbox_${i}`).checked) {
            apply_infos.push(i+1);
        }
    }
    data = {student_id, student_name, apply_infos};
    // send data
    let result = await axios.post('/api/example', data);
    console.log(result);
}

putDataInTable("info_tab");