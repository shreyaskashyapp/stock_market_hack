import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const proxy = "https://cors-anywhere.herokuapp.com/";
const apiUrl = "https://query1.finance.yahoo.com/v8/finance/chart/AAPL?symbol=AAPL&period1=1634841000&period2=1660501800&useYfid=true&interval=1d&includePrePost=true&events=div%7Csplit%7Cearn&lang=en-US&region=US&crumb=m%2FlQLK.F88U&corsDomain=finance.yahoo.com";
const reddit = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=1min&apikey=Q9B5DSCXOI33L4CV.";
const newUrl = `${proxy}${reddit}`;

export default function Ticker(props) {
  const [price, setPrice] = useState(0);
  const [series, setSeries] = useState([{ data: [] }]);

  async function fetchPrice() {
    try {
      const response = await fetch(`http://localhost:8081/stock?symbol=${props.name}`);
      const data = await response.json();
      return data.stockData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  useEffect(() => {
    let timeoutId;

    async function getLatestPrice() {
      try {
        const data = await fetchPrice();
        const stock = data;
        console.log(stock)
        setPrice(stock.meta.regularMarketPrice.toFixed(2));
        const quote = stock.indicators.quote[0];
        const prices = stock.timestamp
          .slice(-200) // Get the last 100 data points
          .map((timestamp, index) => ({
            x: new Date(timestamp * 1000),
            y: [quote.open[index], quote.high[index], quote.low[index], quote.close[index]]
          }));
        setSeries([{ data: prices }]);
      } catch (error) {
        console.log(error);
      }
      timeoutId = setTimeout(getLatestPrice, 5000 * 2);
    }

    getLatestPrice();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [props.name]);

  const chart = {
    options: {
      chart: {
        type: 'candlestick',
        height: 350
      },
      title: {
        text: 'CandleStick Chart',
        align: 'left',
        style: {
          color: '#ffffff' // Set the font color to white
        }
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        tooltip: {
          enabled: true
        },
        labels: {
          style: {
            colors: ['#ffffff'] // Set the font color of the y-axis labels to white
          }
        }
      }
    },
    series: series
  };

  return (
    <div>
      {props.name} {price}
      
      <Chart options={chart.options} series={chart.series} type="candlestick" width="100%" height={320} />
    </div>
  );
}