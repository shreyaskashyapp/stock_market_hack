import React, { useState, useEffect } from 'react';

export default function Stock(props) {
  const [price, setPrice] = useState(0);
  const [symbol, setSymbol] = useState("AAPL");

  useEffect(() => {
    setSymbol(props.name);
  }, [props.name]);

  async function fetchPrice() {
    try {
      const response = await fetch(`http://localhost:8081/stock?symbol=${symbol}`);
      const data = await response.json();
      return data.stockData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  useEffect(() => {
    fetchPrice()
      .then((data) => {
        if (data && data.meta && data.meta.regularMarketPrice) {
          setPrice(data.meta.regularMarketPrice);
        } else {
          console.log("Invalid data received:", data);
        }
      })
      .catch((error) => {
        console.log("Error fetching price:", error);
      });
  }, [symbol]);

  return (
    <div className="stock-info">
      <div className="stock-name">
      <div className='sui'>
      {props.name}
      </div>
      </div>
      <div className="stock-price">
      <div className='sui1'>
        {price}
      </div>
      </div>
    </div>
  );
}