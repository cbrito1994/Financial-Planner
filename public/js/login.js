const loginFormHandler = async (event) => {
    event.preventDefault();

const emailbtn = document.getElementById ('emailbtn');
const passwordlbtn = document.getElementById ('passwordbtn');
const submitbtn = document.getElementById ('submitbtn');
const emailInfo = emailbtn.value;
const passwordInfo = passwordbtn.value;


    if (emailInfo && passwordInfo ) {
        const response = await fetch("/api/user/login", {
            method: 'POST',
            body: JSON.stringify({
                email: emailInfo,
            password: passwordInfo
            }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          console.log(response);
          alert('You are logged in');
          document.location.replace('/');
        } else {
            console.log(response)
          alert('Failed to log in');
        }
      }
    };
    
    document
      .querySelector('.login-form')
      .addEventListener('submit', loginFormHandler);
    




