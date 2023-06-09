import React, { useState, useEffect } from 'react';
import Bot from './bot';
import Ticker from './ticker';
import Result from './result'

export default function Compete() {
  const [timer, setTimer] = useState(10);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [action, setAction] = useState()
  const [prevPrice,setPrevPrice]=useState(600)
  const [price,setPrice]= useState()
  const [cond,setCond] = useState("STATUS")
  const [stock,setStock]=useState("APPL")

  function comparePrices() {
    if (prevPrice >= price && action === 'SELL' || prevPrice <= price && action === 'BUY') {
      console.log(`prevprice=${prevPrice} and curr=${price}`)
      setCond('PROFIT');
    } else {
      setCond('LOSS');
    }
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
  useEffect(() => {
    let countdown;

    if (isTimerRunning) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      clearInterval(countdown);
    }

    return () => clearInterval(countdown);
  }, [timer, isTimerRunning]);

  const handleBuy = () => {
    setIsTimerRunning(true);
    setAction("BUY")
    setTimer(10);


  };

  const handleSell = () => {
    setIsTimerRunning(true);
    setAction("SELL")
    setTimer(10);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div className="compete">
        <div className="player">
          <div className="graph">
            <Ticker name="AAPL" />
          </div>

          <div className="player-footer">
            <div className="buy-sell2">
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
          </div>
          <div className="timer-container">
            <div className="timer">{formatTime(timer)}</div>
          </div>
        </div>

        <div className="bot">
          <div className="graph"><Ticker name="AAPL" /></div>
          <div>
            <Bot timerExpired={timer === 0} />
          </div>
        </div>
      </div>
      {!timer && <div className="result"><Result prevPrice="180" currentPrice="180.57" botaction="BUY" playeraction={action} /></div>}
    </div>
  );
}