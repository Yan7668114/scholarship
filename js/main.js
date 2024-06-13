let item_info_len = 0;

async function getItemInfo() {
    // get the data from table : item_info
    try {
        let result = await axios.get('/api/main');
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
            if (i === 2 || i === 3 || i === 10 || i === 11) {
                table_content += `
                    <tr>
                        <td><input type='checkbox' id='checkbox_${i}'/></td>
                        <td>${data[i].item_content}</td>
                        <td><div>申請單位:</div><input type='text' id='unit_${i}'/></td>
                        <td><div>獲得補助金額:</div><input type='number' id='subsidy_${i}'/></td>
                    </tr>`;
            } else if (i === 4 || i === 5 || i === 12 || i === 13) {
                table_content += `
                    <tr>
                        <td><input type='checkbox' id='checkbox_${i}'/></td>
                        <td>${data[i].item_content}</td>
                        <td><div>申請單位:</div><input type='text' id='unit_${i}'/></td>
                    </tr>`;
            } else {
                table_content += `
                    <tr>
                        <td><input type='checkbox' id='checkbox_${i}'/></td>
                        <td>${data[i].item_content}</td>
                    </tr>`;
            }
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

// async function setStudentName() {
//     // get student name, and show on page
//     document.getElementById("student_name").innerHTML = "test";
// }

async function sendApplyData() {
    // get student name
    const student_name = document.getElementById("student_name").innerHTML;
    const student_id = document.getElementById("student_id").innerHTML;
    const department_and_grade = document.getElementById("department_and_grade").innerHTML;
    const advisor_name = document.getElementById("advisor_name").innerHTML;
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