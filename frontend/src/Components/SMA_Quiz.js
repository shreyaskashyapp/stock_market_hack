import React, { useState } from 'react';
import '../css/quizstyle.css';

const QuizComp = () => {
  const Questionbank = [
    {
      Question: "What does SMA stand for in SMA trading strategy?",
      Answers: [
        { Answer: " Simple Market Analysis", isCorrect: false },
        { Answer: "Short-term Market Assessment", isCorrect: false },
        { Answer: " Simple Moving Average", isCorrect: true },
        { Answer: " Strategic Market Approach", isCorrect: false }
      ]
    },
    {
      Question: "What is the primary purpose of using SMA in trading?",
      Answers: [
        { Answer: "Identifying support and resistance levels", isCorrect: false },
        { Answer: "Predicting future market trends", isCorrect: false },
        { Answer: "Generating buy and sell signals", isCorrect: true },
        { Answer: "Calculating trading volumes", isCorrect: false }
      ]
    },
    {
      Question: " Which time frame is commonly used for calculating SMA?",
      Answers: [
        { Answer: " Hourly", isCorrect: false },
        { Answer: "Daily", isCorrect: true },
        { Answer: "Weekly", isCorrect: false },
        { Answer: "Monthly", isCorrect: false }
      ]
    },
    {
      Question: "How is the SMA calculated?",
      Answers: [
        { Answer: "By summing up closing prices and dividing by the number of periods", isCorrect: true },
        { Answer: "By taking the highest price in a given period", isCorrect: false },
        { Answer: "By subtracting the opening price from the closing price", isCorrect: false },
        { Answer: "By multiplying the trading volume by the price", isCorrect: false }
      ]
    },
    {
      Question: "How can SMA be used to identify a bullish signal?",
      Answers: [
        { Answer: "When the price crosses below the SMA", isCorrect: false },
        { Answer: "When the SMA line flattens out", isCorrect: false },
        { Answer: "When the price crosses above the SMA", isCorrect: true },
        { Answer: "When the SMA line moves in a downward direction", isCorrect: false }
      ]
    }
  ];

  // useState Hook
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerResponse = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < Questionbank.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className='appy'>
      {showScore ? (
        <div className='score-section'>
          <h1>You have scored {score} out of {Questionbank.length}</h1>
          <button type="submit" onClick={resetQuiz}>Play Again!!</button>
        </div>
      ) : (
        <React.Fragment>
          <div className='question-section'>
            <div className='question-count'>
              <span>{currentQuestion + 1}</span>/{Questionbank.length}
            </div>
            <div className='question-text'>
              {Questionbank[currentQuestion].Question}
            </div>
          </div>
          <div className='answer-section'>
            {Questionbank[currentQuestion].Answers.map((answer) => (
              <button onClick={() => handleAnswerResponse(answer.isCorrect)}>
                {answer.Answer}
              </button>
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default QuizComp;
