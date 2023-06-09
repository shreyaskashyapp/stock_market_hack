import react from "react";

export default function SMA() {
  async function getMeanClose() {
    const url =
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=AAPL&apikey=Q9B5DSCXOI33L4CV";
    const response = await fetch(url);
    const data = await response.json();
    const timeSeries = data["Time Series (Daily)"];

    const closeValues = Object.values(timeSeries)
      .slice(0, 20)
      .map((day) => parseFloat(day["4. close"]));
    const meanClose =
      closeValues.reduce((sum, value) => sum + value, 0) / closeValues.length;

    console.log("Mean of last 20 close values:", meanClose);
  }

  getMeanClose();

  return <div>SMA</div>;
}
