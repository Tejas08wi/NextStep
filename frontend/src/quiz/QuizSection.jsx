import React, { useEffect, useState } from "react";
import data from "../database/data";
import { useSelector } from "react-redux";
import Questions from "./Questions"; // Importing the new Questions component

const QuizSection = () => {
  const [quizData, setQuizData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const state = useSelector((state) => state);
  useEffect(() => {
    console.log(state);
  });

  useEffect(() => {
    // Simulating data fetching
    setQuizData(data); // Set the fetched data to state
  }, []); // Empty dependency array to run once on mount

  const handlePrevClick = () => {
    console.log("Previous button is clicked");
  };

  const handleNextClick = () => {
    console.log("Next button is clicked");
  };

  const handleAnswerChange = (questionId, selectedOption) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  return (
    <div>
      <h1>Quiz Section</h1>
      <Questions
        quizData={quizData}
        selectedAnswers={selectedAnswers}
        handleAnswerChange={handleAnswerChange}
      />{" "}
      {/* Using the Questions component */}
      <div>
        <button onClick={handlePrevClick}>Previous</button>
        <button onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
};

export default QuizSection;
