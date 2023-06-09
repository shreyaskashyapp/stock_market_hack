import React, { useState, useEffect } from 'react';
import '../css/result.css';

export default function Result(props) {
  const [bot, setBot] = useState("");
  const [player, setPlayer] = useState("");
  const [res1,setRes1] = useState("")
  const [res2,setRes2] = useState("")

  useEffect(() => {
    if (
      (props.botaction === "BUY" && props.prevPrice <= props.currentPrice) ||
      (props.botaction === "SELL" && props.prevPrice >= props.currentPrice)
    ) {
      setBot("PROFIT");
      setRes2("green")
    } else {
      setBot("LOSS");
      setRes2("red")
    }

    if (
      (props.playeraction === "BUY" && props.prevPrice <= props.currentPrice) ||
      (props.playeraction === "SELL" && props.prevPrice >= props.currentPrice)
    ) {
      setPlayer("PROFIT");
      setRes1("green")
    } else {
      setPlayer("LOSS");
      setRes1("red")
    }
  }, [props.botaction, props.playeraction, props.prevPrice, props.currentPrice]);

  return (
    <div>
      <div className="results">
        <div className="player-score">
          <div className="info">
            <h2>Player Result</h2>
            <p>Previous Price: {props.prevPrice}</p>
            <p>Current Price: {props.currentPrice}</p>
          </div>
          <div className="result1">
            <h3 className={res1}>{player}</h3>
          </div>
        </div>

        <div className="bot-score">
          <div className="info">
            <h2>Bot Result</h2>
            <p>Previous Price: {props.prevPrice}</p>
            <p>Current Price: {props.currentPrice}</p>
          </div>
          <div className="result2">
            <h3 className={res2}>{bot}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}