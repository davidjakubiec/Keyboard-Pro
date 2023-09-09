import React, { useState, useEffect, useContext } from 'react';
import { Context } from './App'

const TimestampTextBox = () => {
  const [text, setText] = useState('');
  const [prevText, setPrevText] = useState('');
  const [timestamps, setTimestamps] = useState([]);
  const {wordIdx, setWordIdx, letterIdx, setLetterIdx, wordBank, setWordBank} = useContext(Context);

  const handleKeyPress = (event) => {
    const timestamp = new Date().toISOString(); // Get the current timestamp
    const newTimestamps = [...timestamps, timestamp];
    setTimestamps(newTimestamps); 
    //immobilize flashing bar to the right so you can't click back to earlier letters
  };

  useEffect(() => {
    const handleKeyDown = (event) => { 
      if (event.key === ' ' && !event.repeat) {
        // Increment the counter when the space bar is pressed
        setWordIdx((wordIdx) => wordIdx + 1);
        //clear the input box
        setText("");
        //set letterIdx to zero
        setLetterIdx(-1);

        //highlight the next word
        document.getElementById(`${wordIdx+1}`).style.backgroundColor = '#D3D3D3'
        //unhighlight the previous word
        document.getElementById(`${wordIdx}`).style.backgroundColor = ''
      } 
    };

    // Add an event listener to the input tag to capture space bar presses
    document.getElementById('typed-input').addEventListener('keydown', handleKeyDown);
    // Remove the event listener when the component unmounts
    return () => {
      document.getElementById('typed-input').removeEventListener('keydown', handleKeyDown);
        };
    }, [wordBank, wordIdx, letterIdx, text]); // Empty dependency array ensures this effect runs once


    const handleChange = (event) => { 
      if (event.target.value != ' ') {
        //get the last typed letter
        const newLetter = event.target.value.slice(-1);
        //update prevText
        setPrevText(text);
        //update text
        setText(event.target.value);
        //set text to red if there is a typo/set back to grey if the typo is resolved
        if (event.target.value != wordBank[wordIdx].word.slice(0, event.target.value.length)) document.getElementById(`${wordIdx}`).style.backgroundColor = 'red'
        else document.getElementById(`${wordIdx}`).style.backgroundColor = '#D3D3D3'
            }
        }
        
  return (
    <div>
      <input
        id="typed-input"
        type="text"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="Timer will start when you start typing"
      />
      <div>
        <h3>Timestamps for each keypress:</h3>
        <ul>
          {timestamps.map((timestamp, index) => (
            <li key={index}>{timestamp}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimestampTextBox;

