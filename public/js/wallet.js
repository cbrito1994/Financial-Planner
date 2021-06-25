const gainbtn = document.getElementById('gain')
const spendbtn = document.getElementById('spent')
const submit = document.getElementById('walletBtn')
submit.addEventListener('click', () =>{
    const gainInfo = gainbtn.value
    const spentInfo = spendbtn.value
    let balances = 0;
    balances = Number(gainInfo)+ Number(spentInfo);
    fetch("/api/wallet/update", {
        method: 'PUT',
        body: JSON.stringify({
            debit: gainInfo,
            credit: spentInfo,
            balance : balances
        }),
    headers: {
        "Content-Type": "application/json"
    }
    }).then(response => {
        return response.json()
    }).then(data =>{
        document.location.replace('/wallet');
    console.log(data.ok)
     })
})