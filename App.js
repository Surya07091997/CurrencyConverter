import React, { useEffect, useState } from 'react';
import './styles.css';

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('inr');
  const [toCurrency, setToCurrency] = useState('djf');
  const [conversionRate, setConversionRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Fetching currency options
  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data)); // Set all available currencies
      })
      .catch((error) => {
        console.error('Error fetching currencies:', error);
      });
  }, []);

  // Fetch the conversion rate whenever the currencies or amount change
  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`)
        .then((response) => response.json())
        .then((data) => {
          const rate = data[fromCurrency][toCurrency];
          setConversionRate(rate);
          setConvertedAmount(amount * rate); // Convert based on fetched rate
        })
        .catch((error) => {
          console.error('Error fetching conversion rate:', error);
        });
    }
  }, [fromCurrency, toCurrency, amount]);

  // Handle form changes
  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleFromCurrencyChange = (e) => setFromCurrency(e.target.value);
  const handleToCurrencyChange = (e) => setToCurrency(e.target.value);

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <div className="converter">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="amount"
        />
        <select
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          className="currency-select"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
        <span className="arrow">&#8596;</span>
        <select
          value={toCurrency}
          onChange={handleToCurrencyChange}
          className="currency-select"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
        <button id="convert-btn">Convert</button>
      </div>
      <div className="result">
        {convertedAmount !== null && (
          <p>
            Converted Amount: {amount} {fromCurrency.toUpperCase()} ={' '}
            {convertedAmount.toFixed(2)} {toCurrency.toUpperCase()}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;