import React, { useState, useEffect } from "react";
import { useFetchQuestion } from "../hooks/FetchQuestion";
import data from "../database/data";
import { useSelector } from "react-redux";

const Questions = ({ quizData = data, selectedAnswers = {}, handleAnswerChange }) => {
  const [{ isLoading, apiData, serverError }] = useFetchQuestion();
  const [checked, setChecked] = useState(undefined);

  const questions = useSelector(state =>  state.questions.queue[0]);
  useEffect(() => { 
      console.log(questions );
  }, [questions]);


  function onSelect() {
  }

  if(isLoading) return <h3 className="text-light">isLoading</h3>;
  if(serverError) return <h3 className="text-light">{serverError || "Unknown Error"}</h3>;

  return (
    <>
      {!isLoading && !serverError && quizData.length > 0 && (
        <div className="questions">
          <h2 className="text-light">{quizData[0].question}</h2>
          <ul key={quizData[0]?.id}>
            {quizData[0]?.options.map((option, index) => (
              <li key={index}>
                <input
                  type="radio"
                  value={option}
                  name={`question-${quizData[0]?.id}`}
                  id={`q${index}-option`}
                  checked={selectedAnswers[quizData[0]?.id] === option || checked === option}
                  onChange={() => onSelect(option)}
                />
                <label htmlFor={`q${index}-option`} className="text-light">
                  {option}
                </label>
                <div className="check"></div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Questions;
