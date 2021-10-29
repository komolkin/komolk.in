const url = "https://api.coindesk.com/v1/bpi/currentprice.json"
const priceTag = document.querySelector("h2")
let currency = "USD"

const checkPrice = function () {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            priceTag.innerHTML = data.bpi.USD.rate_float.toFixed(1)
        })
}

checkPrice()

setInterval(function () {
    checkPrice()
}, 60000)