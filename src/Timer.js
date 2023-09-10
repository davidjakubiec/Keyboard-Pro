import React, { useState, useEffect, useContext } from 'react';
import { Context } from './App';

function Timer() {
  const [seconds, setSeconds] = useState(60);
  const { testInProgress, setTestInProgress } = useContext(Context);

  useEffect(() => {
    if (testInProgress) {
        const timerInterval = setInterval(() => {
            if (seconds > 0 && testInProgress) {
              setSeconds(seconds - 1);
            } 
            else {
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
    </div>
  );
}

export default Timer;