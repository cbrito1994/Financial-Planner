const baseURL = "/api/wallet/getWallet"
fetch(baseURL, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
}).then(response => {
    response.json()
}).then(data => {
    console.log(data)
})