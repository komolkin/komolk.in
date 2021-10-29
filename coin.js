const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
const priceTag = document.querySelector("h1")
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