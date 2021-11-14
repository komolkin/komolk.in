const ws = new WebSocket('wss://ws.coincap.io/prices?assets=ethereum')
let stockPriceDollars = document.getElementById('stock-price')
let stockPriceCents = document.getElementById('stock-price-cents')

ws.onmessage = function (msg) {
  let stockDollars = JSON.parse(msg.data)
  stockPriceDollars.innerText = stockDollars.ethereum.substring(0, 4)

  let stockCents = JSON.parse(msg.data)
  stockPriceCents.innerText = stockCents.ethereum.substring(4, 7)
}

// .substring(0, 4)