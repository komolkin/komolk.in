const ws = new WebSocket('wss://ws.coincap.io/prices?assets=ethereum')
let stockPriceElement = document.getElementById('stock-price')

ws.onmessage = function (msg) {
  let stockObject = JSON.parse(msg.data)
  stockPriceElement.innerText = stockObject.ethereum
}

// .substring(0, 4)