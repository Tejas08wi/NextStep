import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/result.css';
import {ResultTable} from './ResultTable';

export const Result = () => {
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate('/body/quiz');
  };

  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz Application</h1>
      <div className='result flex-center'>
        <div className='flex'>
          <span>Username</span>
          <span className='bold'>Daily Tuition</span>
        </div>
        <div className='flex'>
          <span>Total Quiz points</span>
          <span className='bold'>50</span>
        </div>
        <div className='flex'>
          <span>Total Questions</span>
          <span className='bold'>05</span>
        </div>
        <div className='flex'>
          <span>Total Attempts</span>
          <span className='bold'>03</span>
        </div>
        <div className='flex'>
          <span>Total Earn Points</span>
          <span className='bold'>30</span>
        </div>
        <div className='flex'>
          <span>Quiz Result</span>
          <span className='bold'>Passed</span>
        </div>
      </div>
      <button className='restart-button' onClick={handleRestart}>Restart</button>
      <ResultTable/>
    </div>
  )
}
