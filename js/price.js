(function() {
  let retryCount = 0;
  const MAX_RETRIES = 3;

  // Function to update price display
  function updatePrice(price) {
    const stockPriceDollars = document.getElementById("stock-price");
    const stockPriceCents = document.getElementById("stock-price-cents");

    if (!stockPriceDollars || !stockPriceCents) {
      console.warn("Price display elements not found, retrying...");
      // Retry after a short delay if elements aren't ready
      if (retryCount < MAX_RETRIES) {
        retryCount++;
        const priceToUpdate = price;
        setTimeout(function() {
          updatePrice(priceToUpdate);
        }, 100);
      }
      return false;
    }

    if (isNaN(price) || price <= 0) {
      console.error("Invalid price:", price);
      return false;
    }

    // Format price: split into dollars and cents
    const priceStr = price.toFixed(2);
    const parts = priceStr.split(".");
    
    try {
      stockPriceDollars.innerText = parts[0];
      stockPriceCents.innerText = "." + parts[1];
      console.log("Ethereum price updated successfully:", priceStr);
      return true;
    } catch (error) {
      console.error("Error updating price display:", error);
      return false;
    }
  }

  // Function to fetch price via HTTP API (more reliable)
  function fetchPrice() {
    console.log("Fetching Ethereum price from CoinCap API...");
    
    fetch("https://api.coincap.io/v2/assets/ethereum", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors'
    })
      .then(response => {
        console.log("API response status:", response.status);
        if (!response.ok) {
          throw new Error("HTTP error! status: " + response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log("API response data:", data);
        if (data && data.data && data.data.priceUsd) {
          const price = parseFloat(data.data.priceUsd);
          if (!updatePrice(price)) {
            console.error("Failed to update price display");
          }
        } else {
          console.error("Unexpected API response format:", data);
          // Try alternative API as fallback
          tryAlternativeAPI();
        }
      })
      .catch(error => {
        console.error("Error fetching price from CoinCap:", error);
        // Try alternative API as fallback
        tryAlternativeAPI();
      });
  }

  // Alternative API fallback (CoinGecko)
  function tryAlternativeAPI() {
    console.log("Trying alternative API (CoinGecko)...");
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error! status: " + response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log("CoinGecko API response:", data);
        if (data && data.ethereum && data.ethereum.usd) {
          const price = parseFloat(data.ethereum.usd);
          updatePrice(price);
        } else {
          console.error("Unexpected CoinGecko API response format:", data);
        }
      })
      .catch(error => {
        console.error("Error fetching price from CoinGecko:", error);
      });
  }

  // Try WebSocket first, fallback to HTTP
  function initWebSocket() {
    try {
      const ws = new WebSocket("wss://ws.coincap.io/prices?assets=ethereum");

      ws.onopen = function() {
        console.log("WebSocket connected to CoinCap");
      };

      ws.onmessage = function (msg) {
        try {
          const data = JSON.parse(msg.data);
          console.log("WebSocket data received:", data);
          
          // Handle different possible response formats
          let price = null;
          if (data.ethereum) {
            price = parseFloat(data.ethereum);
          } else if (data.data && data.data.ethereum) {
            price = parseFloat(data.data.ethereum);
          } else if (typeof data === 'object' && Object.keys(data).length > 0) {
            // Try to find ethereum in the object
            const ethKey = Object.keys(data).find(key => key.toLowerCase().includes('eth'));
            if (ethKey) {
              price = parseFloat(data[ethKey]);
            }
          }

          if (price && !isNaN(price)) {
            updatePrice(price);
          } else {
            console.error("Could not parse price from WebSocket data:", data);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error, msg.data);
        }
      };

      ws.onerror = function(error) {
        console.error("WebSocket error:", error);
        // Fallback to HTTP API
        fetchPrice();
      };

      ws.onclose = function(event) {
        console.log("WebSocket closed", event.code, event.reason);
        // If closed unexpectedly, try HTTP API
        if (event.code !== 1000) {
          fetchPrice();
        }
      };

      // Set timeout - if WebSocket doesn't connect in 3 seconds, use HTTP fallback
      setTimeout(function() {
        if (ws.readyState === WebSocket.CONNECTING || ws.readyState === WebSocket.CLOSED) {
          console.log("WebSocket taking too long or closed, using HTTP fallback");
          ws.close();
          fetchPrice();
        }
      }, 3000);

    } catch (error) {
      console.error("Error creating WebSocket:", error);
      // Fallback to HTTP API
      fetchPrice();
    }
  }

  // Initialize - wait a bit for DOM and animations to be ready
  function init() {
    // Wait a bit longer to ensure elements are ready (accounting for animation delays)
    setTimeout(function() {
      initWebSocket();
      // Also set up periodic updates via HTTP every 30 seconds
      setInterval(fetchPrice, 30000);
      // Initial fetch via HTTP (more reliable for first load)
      fetchPrice();
    }, 100);
  }

  // Since script is at end of body, DOM should be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already ready
    init();
  }
})();
