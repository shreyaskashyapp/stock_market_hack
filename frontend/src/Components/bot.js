import React, { useState, useEffect } from 'react';

export default function Bot(props) {
  const [name, setName] = useState('');
  const [action, setAction] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [price, setPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);
  const [sum, setSum]= useState(0)

  async function fetchPrice() {
    const res = await fetch('http://localhost:8081');
    const Data = await res.json();
    
    const stock = Data
    console.log(stock)
    const currentPrice = stock.meta.regularMarketPrice.toFixed(2);
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

  async function fetchSma() {
    const res= await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=AAPL&apikey=Q9B5DSCXOI33L4CV.")
    const data= await res.json()
    return data
  }

  useEffect(() => {
    async function fetchData() {
      const url =
        'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&topics=technology&apikey=Q9B5DSCXOI33L4CV.';
      const result = await fetch(url);
      const data = await result.json();
      setSentiment(data.feed[0].ticker_sentiment[0].ticker_sentiment_label);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (props.timerExpired) {
      fetchPrice().then(() => {
        if ((prevPrice < price && action === 'BUY') || (prevPrice > price && action === 'SELL')) {
          console.log('BOT OP');
        } else {
          console.log('L BOT');
        }
        console.log(prevPrice);
        console.log(price);
      });
    }
  }, [props.timerExpired, prevPrice, action, price]);

  function handleOptionChange(event) {
    setName(event.target.value);
    if (event.target.value === 'SENTIMENT') {
      if (sentiment === 'Bullish' || sentiment === 'Somewhat Bullish') {
        setAction('BUY');
      } else {
        setAction('SELL');
      }
      fetchPrice(); 
    }
    if (event.target.value === 'SMA') {
      fetchSma()
        .then((data) => {
          const values = data['Time Series (Daily)'];
          const dates = Object.keys(values).slice(0, 20);
          console.log(values['2023-06-07']);
    
          let tempSum = 0;
          for (let i = 0; i < dates.length; i++) {
            const day = values[dates[i]];
            tempSum += parseInt(day['4. close']);
          }
    
          setSum(tempSum / 20);
          console.log(sum);

          fetchPrice()
            .then(()=>{
              if(price>=sum){
                setAction("BUY")
              }
              else{
                setAction("SELL")
              }
            })
        });
    }
  }
  

  return (
    <div>
      <div className="bot-container">
        <div>Strategy: {name}</div>
        <div className="options">
          <select name="strategy" id="strategy" onChange={handleOptionChange}>
            <option value="SENTIMENT">SENTIMENT</option>
            <option value="SMA">SMA</option>
          </select>
        </div>
      </div>
      <div className="sma">
        {sum}
      </div>
    </div>
  );
}