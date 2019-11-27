import React, { useState, useEffect } from "react";
import quizQuestions from "./api/quizQuestions";
import Quiz from "./components/Quiz";

function App() {
  const [counter, setCounter] = useState();
  const [information, setInformation] = useState({
    question: "",
    answerOptions: [],
    result: ""
  });
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setCounter(1);
  }, []);

  useEffect(() => {
    if (counter && quizQuestions[counter - 1]) {
      setInformation({
        ...information,
        question: quizQuestions[counter - 1].question,
        answerOptions: quizQuestions[counter - 1].answers
      });
    }
  }, [counter]);

  useEffect(() => {
    if (Object.entries(answers).length === 5) console.log("Completou carai!");
  }, [answers]);

  const handleAnswerSelected = event => {
    const answersQuestion = [];
    answersQuestion[counter] = event.currentTarget.value;
    setAnswers({ ...answers, ...answersQuestion });
    setTimeout(() => {
      if (counter <= quizQuestions.length) setCounter(counter + 1);
    }, 1000);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Quiz Edu RSXP</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {counter <= quizQuestions.length ? (
            <Quiz
              code={counter}
              answers={answers}
              answerOptions={information.answerOptions}
              question={information.question}
              questionTotal={quizQuestions.length}
              onAnswerSelected={handleAnswerSelected}
            />
          ) : (
            <h2>Acabou</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
