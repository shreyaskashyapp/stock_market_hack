import React, { useState, useEffect } from 'react';
import Ticker from './ticker';
import Stock from './stockInfo';
import Sentiment from './sentiment';

export default function Home() {
  const [stock, setStock] = useState('AAPL');
  const [action, setAction] = useState('');
  const [price, setPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(600);
  const [timer, setTimer] = useState(5);
  const [cond, setCond] = useState('STATUS');

  function handleOptionsChange(event) {
    setStock(event.target.value);
  }

  function handleBuy() {
    setAction('BUY');
    setTimer(5);
    fetchPrice();
  }

  function handleSell() {
    setAction('SELL');
    setTimer(5);
    fetchPrice();
  }

  async function fetchPrice() {
    const res = await fetch(`http://localhost:8081/stock?symbol=${stock}`);
    const data = await res.json();

    const stockData = data;
    console.log(stockData);
    const currentPrice = data.stockData.meta.regularMarketPrice.toFixed(2);
    setPrice(currentPrice);
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    console.log(`Current time is: ${hours}:${minutes}:${seconds}`);
    if (prevPrice === 0) {
      setPrevPrice(currentPrice);
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();

      console.log(`Current time is: ${hours}:${minutes}:${seconds}`);
    }
  } 

  function comparePrices() {
    if (prevPrice >= price && action === 'SELL' ||prevPrice <= price && action === 'BUY') {
      console.log(`prevprice=${prevPrice} and curr=${price}`)
      setCond('PROFIT');
    } else {
      setCond('LOSS');
    }
  }

  useEffect(() => {
    if (timer === 0) {
      console.log("Called")
      comparePrices();
    }
  }, [timer]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      comparePrices();
    }
  }, [timer]);

  return (
    <div>
      <div className="ticker">
        <Ticker name={stock} />
      </div>
      <div>
        <select name="" id="" onChange={handleOptionsChange} value={stock}>
          <option value="AAPL">AAPL</option>
          <option value="META">META</option>
          <option value="AMZN">AMZN</option>
          <option value="GOOGL">GOOGL</option>
          <option value="LICI.NS">LICI</option>
        </select>
      </div>
      <div className="home-footer">
        <div className="stock-info-container">
          <Stock name={stock} />
        </div>

        <div className="buy-sell">
          <div className="buy">
            <button className="buybutt" onClick={handleBuy}>
              BUY
            </button>
          </div>

          <div className="sell">
            <button className="sellbutt" onClick={handleSell}>
              SELL
            </button>
          </div>
        </div>

        <div className="sentiment">
          <div className="stock-logo"><i class="ri-apple-fill"></i></div>
          <div className="stock-sentiment">
            <Sentiment name={stock} />
          </div>
        </div>
      </div>
      {timer > 0 && <div className="timer">{timer}</div>}
      <div className="cond">{cond}</div>
    </div>
  );
}