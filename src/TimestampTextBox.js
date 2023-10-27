import React, { useState, useEffect, useContext } from 'react';
import { Context } from './App'

const TimestampTextBox = () => {

  const {setEditTime, text, setText, wordIdx, setWordIdx, letterIdx, setLetterIdx, wordBank, setWordBank, testResults, setTestResults, testInProgress, setTestInProgress, wordResultsArray, setWordResultsArray, viewResults} = useContext(Context);

  useEffect(() => {
    const handleKeyDown = (event) => { 
      //update the testResults Object for each key down
      const updatedTestResults = { ...testResults };
      const currLetter = wordBank[wordIdx].word[document.getElementById('typed-input').value.length];
      const currWord = document.getElementById('typed-input').value
      let color = '';

      if (event.key === " ") color = 'green'
      else if (event.key === "Backspace") color = 'orange'
      else if (event.key !== currLetter) color = 'red'
      else color = 'steelblue'

      updatedTestResults[`${new Date().toISOString()}`] = {
        "word": wordBank[wordIdx].word,
        "typedInputLetter": event.key,
        "expectedLetter": currLetter,
        "correct": event.key === currLetter,
        "color": color
      };

      setTestResults(updatedTestResults);

      //handle if users presses spacebar
      if (event.key === ' ' && !event.repeat) {
        setWordResultsArray([...wordResultsArray, currWord])
        // Increment the counter when the space bar is pressed
        setWordIdx((wordIdx) => wordIdx + 1);
        //clear the input box
        setText("");
        //set letterIdx to zero
        setLetterIdx(-1);

        if (document.getElementById(wordIdx+1).getBoundingClientRect().left < document.getElementById(wordIdx).getBoundingClientRect().left) document.querySelector('.wordbank-container').scrollTop += 74

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
      if (document.getElementById('typed-input')) document.getElementById('typed-input').removeEventListener('keydown', handleKeyDown);
        };
    }, [wordBank, wordIdx, letterIdx, text]); // Empty dependency array ensures this effect runs once


    const handleChange = (event) => { 
      setTestInProgress(true);
      setEditTime(false);
      // console.log(testInProgress)
      if (event.target.value != ' ') {
        //get the last typed letter
        const newLetter = event.target.value.slice(-1);


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
        autoComplete='off'
        placeholder={testInProgress ? "" : "Start typing here..."}
      />
  
    </div>
  );
};

export default TimestampTextBox;

