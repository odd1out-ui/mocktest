import React from "react";

const ResultScreen = ({ results }) => {

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">DashBoard</h2>
      
      {results.flatMap((item, index) => {
        
        return (
          <div key={index} className="mb-6 border border-white-500/50 ">
            
            <p className="font-semibold">Question: {item.question}</p>
            <p>UserAnswer: {item.userAnswer}</p>
            <p>CorrectAnswer:{item.correctAnswers}</p>
            <p style={{font:'bold',color:'green'}}>Your response: {item.isCorrect}</p>
            
          </div>
        );
      })}
    </div>
  );
};

export default ResultScreen;
