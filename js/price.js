// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", function() {
  const stockPriceDollars = document.getElementById("stock-price");
  const stockPriceCents = document.getElementById("stock-price-cents");

  if (!stockPriceDollars || !stockPriceCents) {
    console.error("Price display elements not found");
    return;
  }

  try {
    const ws = new WebSocket("wss://ws.coincap.io/prices?assets=ethereum");

    ws.onopen = function() {
      console.log("WebSocket connected to CoinCap");
    };

    ws.onmessage = function (msg) {
      try {
        const data = JSON.parse(msg.data);
        const price = parseFloat(data.ethereum);

        if (isNaN(price)) {
          console.error("Invalid price data:", data);
          return;
        }

        // Format price: split into dollars and cents
        const priceStr = price.toFixed(2);
        const parts = priceStr.split(".");
        
        stockPriceDollars.innerText = parts[0];
        stockPriceCents.innerText = "." + parts[1];
      } catch (error) {
        console.error("Error parsing price data:", error);
      }
    };

    ws.onerror = function(error) {
      console.error("WebSocket error:", error);
      // Fallback: try fetching via HTTP API
      fetchPriceFallback(stockPriceDollars, stockPriceCents);
    };

    ws.onclose = function() {
      console.log("WebSocket closed");
      // Try to reconnect or use fallback
      fetchPriceFallback(stockPriceDollars, stockPriceCents);
    };
  } catch (error) {
    console.error("Error creating WebSocket:", error);
    // Fallback to HTTP API
    fetchPriceFallback(stockPriceDollars, stockPriceCents);
  }
});

// Fallback function to fetch price via HTTP API
function fetchPriceFallback(dollarsEl, centsEl) {
  fetch("https://api.coincap.io/v2/assets/ethereum")
    .then(response => response.json())
    .then(data => {
      const price = parseFloat(data.data.priceUsd);
      if (!isNaN(price)) {
        const priceStr = price.toFixed(2);
        const parts = priceStr.split(".");
        dollarsEl.innerText = parts[0];
        centsEl.innerText = "." + parts[1];
      }
    })
    .catch(error => {
      console.error("Error fetching price:", error);
    });
}
