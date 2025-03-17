import React, { useEffect, useState } from 'react';
import './styles.css';

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('inr');
  const [toCurrency, setToCurrency] = useState('djf');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data));
      })
      .catch((error) => {
        console.error('Error fetching currencies:', error);
      });
  }, []);

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleFromCurrencyChange = (e) => setFromCurrency(e.target.value);
  const handleToCurrencyChange = (e) => setToCurrency(e.target.value);

  const handleConvert = () => {
    if (fromCurrency && toCurrency) {
      fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`)
        .then((response) => response.json())
        .then((data) => {
          const rate = data[fromCurrency][toCurrency];
          setConvertedAmount(amount * rate);
          setShowResult(true);
        })
        .catch((error) => {
          console.error('Error fetching conversion rate:', error);
        });
    }
  };

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
        <button id="convert-btn" onClick={handleConvert}>
          Convert
        </button>
      </div>
      {showResult && convertedAmount !== null && (
        <div className="result">
          <p>
            Converted Amount: {amount} {fromCurrency.toUpperCase()} ={' '}
            {convertedAmount.toFixed(2)} {toCurrency.toUpperCase()}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
