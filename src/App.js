import React, { useEffect, useState } from "react";
import questionsData from "./api/question.json";
import logo from "./assets/Vector (1).png";
import ellipse from "./assets/Ellipse 15.png";
import "./App.css";
import Question from "./components/Question.js";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setQuestions(questionsData.data.questions);
  }, []);

  return (
    <div className="app-container">
      <div className="app-content">
        <img src={logo} className="logo" alt="Logo" />

        <h1 className="title">Sentence Construction</h1>

        <h3 className="subtitle">
          Select the correct words to complete the sentence by arranging the
          provided options in the right order.
        </h3>

        <div className="stats-grid">
          <div>
            <h4 className="stat-label">Timer per Question</h4>
          </div>
          <div>
            <h4 className="stat-label">Total Questions</h4>
          </div>
          <div>
            <h4 className="stat-label">Coins</h4>
          </div>
          <div>
            <h4 className="stat-value">30sec</h4>
          </div>
          <div>
            <h4 className="stat-label">10</h4>
          </div>
          <div>
            <h4 className="stat-value">0</h4>
          </div>
        </div>

        <Question questions={questions} />
      </div>
    </div>
  );
};

export default App;
