import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(timerInterval); 
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [seconds]);

  return (
    <div>
      <h1>Countdown Timer</h1>
      <p>Time Remaining: {seconds} seconds</p>
    </div>
  );
}

export default Timer;