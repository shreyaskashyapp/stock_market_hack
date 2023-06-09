import react,{useState,useEffect} from 'react'



export default function Sentimenet(props){
  const[sentiment,setSentiment]= useState()
  const[news,setNews]= useState()
  async function fetchData() {
    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${props.name}&topics=technology&apikey=Q9B5DSCXOI33L4CV.`
    const result = await fetch(url)
    return result.json()
  }
  useEffect(()=>{
      fetchData()
        .then((data) => {
          console.log(data.feed)
          console.log(data.feed[0].ticker_sentiment[0].ticker_sentiment_label)
          setSentiment(data.feed[0].ticker_sentiment[0].ticker_sentiment_label)
          setNews(data.feed[0].url)
        })
  },[])
  return(
    <div>
      <a href={news} target="_blank">{sentiment}</a>
    </div>
  )
}