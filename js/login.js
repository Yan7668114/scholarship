async function submit() {
    const account = document.getElementById("account").value;
    const password = document.getElementById("password").value;
    let data = {account : account, password : password};
    let suc_login = await axios.post('http://163.22.17.184:5000/api/login', data);
    suc_login = suc_login.data;
	console.log(suc_login);
    if (suc_login.suc) {
<<<<<<< HEAD
        
        location.href = '/main';
=======
        if (account.length >= 9) {
            // student
            location.href = `/main?name=${suc_login.authen_result}&s_num=${account}`;
        }
        else {
            // assistant
            location.href = `/audit?name=${suc_login.authen_result}&s_num=${account}`;
        }
>>>>>>> 4e70160c94fd9e085e7a88cae6638beb2998fb45
    }
    else {
	    alert("帳號或密碼錯誤");
    }
}