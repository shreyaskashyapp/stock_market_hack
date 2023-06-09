import React, { useState } from 'react';
import '../../css/quizstyle.css';

const QuizComp = () => {
  const Questionbank = [
    {
      Question: "What is a stock market?",
      Answers: [
        { Answer: "A place where people buy and sell groceries", isCorrect: false },
        { Answer: "A physical location where stocks are stored", isCorrect: false },
        { Answer: "A marketplace where shares of publicly traded companies are bought and sold", isCorrect: true },
        { Answer: "A financial institution that provides loans for purchasing stocks", isCorrect: false }
      ]
    },
    {
      Question: "What is a stock?",
      Answers: [
        { Answer: "A type of seasoning used in cooking", isCorrect: false },
        { Answer: "A certificate proving ownership in a company", isCorrect: true },
        { Answer: "A tool used for gardening", isCorrect: false },
        { Answer: "A unit of measurement for liquid volume", isCorrect: false }
      ]
    },
    {
      Question: "What is the role of a stockbroker?",
      Answers: [
        { Answer: "To manage a company's finances", isCorrect: false },
        { Answer: "To represent buyers and sellers in stock market transactions", isCorrect: true },
        { Answer: "To provide legal advice for stock market regulations", isCorrect: false },
        { Answer: "To analyze market trends and predict stock prices", isCorrect: false }
      ]
    },
    {
      Question: "What is the stock market index?",
      Answers: [
        { Answer: "A ranking of the most valuable stocks in the market", isCorrect: false },
        { Answer: "A measurement of the average price of a group of stocks", isCorrect: true },
        { Answer: "A database containing information about all stocks", isCorrect: false },
        { Answer: "A tool used to calculate dividends for shareholders", isCorrect: false }
      ]
    },
    {
      Question: "What is the difference between a bull market and a bear market?",
      Answers: [
        { Answer: "A bull market is when stock prices are rising, while a bear market is when stock prices are falling", isCorrect: true },
        { Answer: "A bull market is when stock prices are falling, while a bear market is when stock prices are rising", isCorrect: false },
        { Answer: "A bull market is when there is high demand for stocks, while a bear market is when there is low demand for stocks", isCorrect: false },
        { Answer: "A bull market is when investors are pessimistic, while a bear market is when investors are optimistic", isCorrect: false }
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
    <div className='app'>
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
            {Questionbank[currentQuestion].Answers.map((answer, index) => (
              <button key={index} onClick={() => handleAnswerResponse(answer.isCorrect)}>
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
