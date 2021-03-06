const logoutbtn = document.querySelector('#logoutbtn')


const logout = async () => {
    const response = await fetch('/api/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  console.log(response);
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  
document.getElementById("logoutbtn").addEventListener('click', logout);
