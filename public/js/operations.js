const sellbtn = document.querySelector("#sellbtn")

submit.addEventListener('click', () =>{
    const sellInfo = sellbtn.value
    console.log(sellInfo)
    fetch("/api/wallet/sell", {
        method: 'PUT',
        body: JSON.stringify({
            product_id : sellInfo,
        }),
    headers: {
        "Content-Type": "application/json"
    }
    }).then(response => {
        return response.json()
    }).then(data =>{
    console.log(data.ok)
     })
})

