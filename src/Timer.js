import React, { useState, useEffect, useContext } from 'react';
import { Context } from './App';

const Timer = () => {

  const { testInProgress, setTestInProgress, viewResults, setViewResults, seconds, setSeconds, text, setText } = useContext(Context);

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
        {viewResults ? <div></div> : 
          <>
            <div className='timer'>{seconds} seconds</div>
          </>
  }
    </div>
  );
}

export default Timer;