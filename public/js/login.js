const emailbtn = document.getElementById ('emailbtn');
const passwordlbtn = document.getElementById ('passwordbtn');
const submitbtn = document.getElementById ('submitbtn');
submitbtn.addEventListener('click', () => {
    const emailInfo = emailbtn.value;
    const passwordInfo = passwordbtn.value;
    fetch("/api/user/login", {
        method: 'POST',
        body: JSON.stringify({
            email: emailInfo,
            password: passwordInfo
        }),
    headers: {
        "Content-Type": "application/json"
    }
    }).then(response => {
        return response.json()
    }).then(data =>{
    
    console.log(data);
if (data) {
    window.location = "/profile"
    console.log(" tas dentro");
    }
     })
    })






