async function submit() {
    const account = document.getElementById("account").value;
    const password = document.getElementById("password").value;
    console.log(account, password);
    let data = {account : account, password : password};
    let suc_login = await axios.post('http://163.22.17.184:5000/api/login', data);
    suc_login = suc_login.data;
	console.log(suc_login);
    if (suc_login.suc) {
        
        location.href = '/main';
    }
    else {
	    alert("帳號或密碼錯誤");
    }
}