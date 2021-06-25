
const purchaseFormHandler = async (event) => {
    event.preventDefault();

const purchaseBut = document.getElementById('purchaseBtn');
const numberStock = document.getElementById('numberstocks');
const product_id = purchaseBut.value;
const number_stocks = numberStock.value;



if (product_id && number_stocks ) {   
    const response = await  fetch("/api/inventory/buy", {
        method: 'PUT',
        body: JSON.stringify({
            product_id,
            number_stocks,
        }),
    headers: {
        "Content-Type": "application/json"},
    });

    if (response.ok) {
      console.log(response);
      alert('buy completed');
      document.location.replace('/operations');
    } else {
        console.log(response)
      alert('Failed to buy stock');
    }
  }
};


  const sellFormHandler = async (event) => {
    event.preventDefault();

    const sellbtn = document.getElementById("sellbtn");
    const sellInfo = sellbtn.value;

if (sellInfo) {   
    const response = await  fetch("/api/wallet/sell", {
        method: 'PUT',
        body: JSON.stringify({
            product_id : sellInfo,
        }),
    headers: {
        "Content-Type": "application/json"},
    });
    if (response.ok) {
      console.log(response);
      alert('sell completed');
      document.location.replace('/operations');
    } else {
        console.log(response)
      alert('Failed to sell stock');
    }
  }
};



document
  .querySelector('.purchase-form')
  .addEventListener('submit', purchaseFormHandler);



document
  .querySelector('.sell-form')
  .addEventListener('submit', sellFormHandler);
