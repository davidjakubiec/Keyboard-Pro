import React, { useState, useEffect, useContext } from 'react';
import { Context } from './App';

const Timer = () => {

  const { testDuration, setTestDuration, editTime, setEditTime, testInProgress, setTestInProgress, viewResults, setViewResults, seconds, setSeconds, text, setText } = useContext(Context);

  useEffect(() => {
    if (testInProgress) {
        const timerInterval = setInterval(() => {
            if (seconds > 0 && testInProgress) {
              setSeconds(seconds - 1);
            } 
            else {
              window.scrollTo({top: 1250, behavior:'smooth', duration: 0.1})
              // document.getElementById('results-first').scrollIntoView();
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

const handleClick = () => {
  if (!testInProgress) {
    if (!editTime) {
      setEditTime(true);
    } else {
      //Give a min of 30 seconds for the test
      // setSeconds(Math.max(30, seconds))
      setEditTime(false);
      setTestDuration(seconds);
    } 
  }
  

};

const handleChange = (event) => {

  setSeconds(event.target.value);
};
  //change the input toggle to a drop down when you click the time
  return (
    <div>
          <>
          <div className='timer' >
            {editTime ? 
            <span >
              
              <input id="time-input" value={seconds} maxLength="3"onChange={handleChange}></input> 
              <span onClick={handleClick}>seconds </span>
              {/* <button onClick={handleClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                <path fill="#43A047" d="M40.6 12.1L17 35.7l-9.6-9.6L4.6 29L17 41.3l26.4-26.4z"/>
              </svg>
              </button> */}
            </span>
            :
            <div onClick={handleClick}>{seconds} seconds
              {/* <button className='clickable-timer' onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                  <path className='timer-icon' fill="white" d="M9 3V1h6v2H9Zm2 11h2V8h-2v6Zm1 8q-1.85 0-3.488-.713T5.65 19.35q-1.225-1.225-1.938-2.863T3 13q0-1.85.713-3.488T5.65 6.65q1.225-1.225 2.863-1.938T12 4q1.55 0 2.975.5t2.675 1.45l1.4-1.4l1.4 1.4l-1.4 1.4Q20 8.6 20.5 10.025T21 13q0 1.85-.713 3.488T18.35 19.35q-1.225 1.225-2.863 1.938T12 22Zm0-2q2.9 0 4.95-2.05T19 13q0-2.9-2.05-4.95T12 6Q9.1 6 7.05 8.05T5 13q0 2.9 2.05 4.95T12 20Zm0-7Z"/>
                </svg>
              </button> */}
            
            </div>}
            </div>
            
          </>
  
    </div>
  );
}

export default Timer;