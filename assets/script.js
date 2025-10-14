// MWardcoin Live Crypto Price Script

const priceContainer = document.getElementById('crypto-prices');

async function loadCryptoPrices() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,dogecoin,tether&vs_currencies=usd,gbp,eur,ngn'
    );
    const data = await response.json();
    priceContainer.innerHTML = '';

    for (const [coin, values] of Object.entries(data)) {
      const card = document.createElement('div');
      card.className = 'price-card';
      card.innerHTML = `
        <h3>${coin.toUpperCase()}</h3>
        <p>USD: $${values.usd.toLocaleString()}</p>
        <p>GBP: £${values.gbp.toLocaleString()}</p>
        <p>EUR: €${values.eur.toLocaleString()}</p>
        <p>NGN: ₦${values.ngn.toLocaleString()}</p>
      `;
      priceContainer.appendChild(card);
    }
  } catch (error) {
    priceContainer.innerHTML = '<p>Error loading live prices. Please refresh.</p>';
    console.error('Error fetching prices:', error);
  }
}

loadCryptoPrices();
setInterval(loadCryptoPrices, 60000); // refresh every 60s
