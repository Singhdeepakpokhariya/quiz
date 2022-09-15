import React, { useState } from "react";
import Questions from "./Questions.json";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import { Rating } from "react-simple-star-rating";

const Quiz = () => {
  const questions = Questions;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [show, setShow] = useState(0);
  const [rating, setRating] = useState(3);

  const questionHandler = () => {
    setShow(0);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setRating(justCount());
    } else {
      setShowResult(true);
    }
  };

  const answerHandler = (e) => {
    const selectedAnswer = e.target.innerText;
    if (
      decodeURIComponent(questions[currentQuestion].correct_answer) ===
      selectedAnswer
    ) {
      if (show === 0) {
        setScore(score + 1);
      }
      console.log(show);
      setShow(1);
    } else {
      setShow(2);
    }
  };

  const justCount = () => {
    switch (questions[currentQuestion].difficulty) {
      case "easy":
        return 1;
      case "medium":
        return 2;
      case "hard":
        return 3;
      default:
        return 0;
    }
  };

  return (
    <>
      <h2 className="my-2 mx-2 title ">Let's Crack it </h2>
      <div className="container quizBody">
        {showResult ? (
          <div className="score-section">
            <h1>{`Your Score is ${score} Out of ${questions.length}`}</h1>
          </div>
        ) : (
          <>
            <ProgressBar now={(currentQuestion + 1) * 5} />
            <div className=" QA">
              <div className="question-section">
                <div className="question-count my-4">
                  <h2>{`Question ${currentQuestion + 1} of ${
                    questions.length
                  } `}</h2>
                  <p>
                    {decodeURIComponent(questions[currentQuestion].category)}
                  </p>
                  <div className="rating">
                    <Rating initialValue={rating} readonly={true} size={20} />
                  </div>
                </div>
                <div className="question-text">
                  <p>
                    {decodeURIComponent(questions[currentQuestion].question)}
                  </p>
                </div>
              </div>
              <div className="answer-section my-5">
                <span onClick={answerHandler}>
                  {decodeURIComponent(
                    questions[currentQuestion].correct_answer
                  )}
                </span>
                {questions[currentQuestion].incorrect_answers.map(
                  (options, index) => (
                    <span onClick={answerHandler} key={index}>
                      {decodeURIComponent(options)}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="nextStep ">
              {show === 1 ? (
                <p className="message">Correct Answer</p>
              ) : show === 2 ? (
                <p className="message">OOPS Wrong Answer</p>
              ) : (
                ""
              )}

              {show === 1 ? (
                <Button variant="primary" onClick={questionHandler}>
                  {currentQuestion !== questions.length - 1
                    ? " Next Question"
                    : "Show Result"}
                </Button>
              ) : (
                ""
              )}

              <div className="scoreBar my-3">
                <div className="score  ">
                  <span>Score: {score * 4.5}%</span>
                  <span>Max Score:75%</span>
                </div>
                <ProgressBar>
                  <ProgressBar variant="success" now={score * 4.5} key={1} />
                  <ProgressBar variant="warning" now={7} key={2} />
                  <ProgressBar variant="secondary" now={3} key={3} />
                </ProgressBar>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Quiz;
