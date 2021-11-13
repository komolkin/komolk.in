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







var baseUrl = "https://api.coinranking.com/v2"
var proxyUrl = "https://cors-anywhere.herokuapp.com/"
var apiKey = "coinranking3bd1ffde1dc0820134fff4abcdf88fffd4229edb9f04f2f8"

var apiUrl = `${proxyUrl}${baseUrl}`;
console.log(apiUrl);

fetch(`${proxyUrl}${baseUrl}`, { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-My-Custom-Header': `${apiKey}`,
      'Access-Control-Allow-Origin': "*"
    }
})
  .then((response) => {
    if (response.ok) {
      response.json().then((json) => {
        console.log(json.data);
        let coinsData = json.data.coins;

        if (coinsData.length > 0) {
          var cryptoCoin = "";
        }
        //For Loop Starts
        coinsData.forEach((coin) => {
          cryptoCoin += "<tr>";
          cryptoCoin += `<td> ${coin.uuid} </td>`;
          cryptoCoin += `<td> ${coin.btcPrice} </td>`;
          cryptoCoin += `<td> ${coin.rank}</td>`;
          cryptoCoin += `<td> ${coin.tier} </td>`;
          cryptoCoin += `<td> ${coin.name}</td>`;
          cryptoCoin += `<td> $${Math.round(coin.price)} Billion</td>`;
          cryptoCoin += `<td> ${coin.symbol}</td>`;"<tr>";
        });
        //For Loop Ends
        document.getElementById("data").innerHTML = cryptoCoin;
      });
    }
  })
  .catch((error) => {
    console.log(error);
  });