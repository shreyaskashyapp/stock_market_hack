import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();

app.use(cors());

let latestData = null;

async function fetchData(stockSymbol = "AAPL") {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${stockSymbol}?symbol=${stockSymbol}.NS&period1=1686123799&period2=1686296599&useYfid=true&interval=1m&includePrePost=true&events=div|split|earn&lang=en-US&region=US&crumb=m/lQLK.F88U&corsDomain=finance.yahoo.com`;
    const response = await fetch(url);
    const data = await response.json();
    return data.chart.result[0]; // Assuming the stock data is available at `chart.result[0]`
  } catch (error) {
    console.log(error);
  }
}

async function updateLatestData() {
  latestData = await fetchData();
}

setInterval(updateLatestData, 5 * 1000);

app.get('/', (req, res) => {
  res.json(latestData);
});

app.get('/stock', async (req, res) => {
  const stockSymbol = req.query.symbol;
  try {
    let stockData;
    if (stockSymbol) {
      stockData = await fetchData(stockSymbol);
    } else {
      stockData = await fetchData();
    }
    res.json({ stockData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});