import React, { useState, useEffect, useContext } from 'react';
import { Context } from './App';

const Timer = () => {
  const [seconds, setSeconds] = useState(6);
  const { testInProgress, setTestInProgress, viewResults, setViewResults } = useContext(Context);

  useEffect(() => {
    if (testInProgress) {
        const timerInterval = setInterval(() => {
            if (seconds > 0 && testInProgress) {
              setSeconds(seconds - 1);
            } 
            else {
              setViewResults(true);
              setTestInProgress(false);
              clearInterval(timerInterval); 
            }
          }, 1000);
      
          return () => {
            clearInterval(timerInterval);
          };
        }
    }
, [seconds, testInProgress]);

  return (
    <div>
      <h1>Countdown Timer</h1>
      <p>Time Remaining: {seconds} seconds</p>
      <div>test in Progress: {testInProgress ? 'true' : 'false'}</div>
      <div>view Results: {viewResults ? 'true' : 'false'}</div>
    </div>
  );
}

export default Timer;