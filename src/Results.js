import React, { useContext, useState, useEffect, useRef } from 'react'
import { Context } from './App'
import Timer from './Timer'
import TimestampTextBox from './TimestampTextBox'
import * as d3 from 'd3';

const Results = () => {

    const { text, setText, wordIdx, setWordIdx, viewResults, setViewResults, testResults, setTestResults, wordResultsArray, setWordResultsArray , wordBank, setWordBank, setLetterIdx, seconds, setSeconds } = useContext(Context)
    const keystrokes = Object.keys(testResults).length;
    // const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
    // const [incorrectKeystrokes, setIncorrectKeystrokes] = useState(0);
    // const [correctWords, setCorrectWords] = useState(0);
    let correctKeystrokes = 0;
    let incorrectKeystrokes = 0;
    let correctWords = 0;
    let testResultsArray = Object.values(testResults);

    useEffect(() => {
        correctKeystrokes = 0;
        incorrectKeystrokes = 0;
        correctWords = 0;
        testResultsArray = Object.values(testResults);
        if (viewResults) {
            testResultsArray.forEach((el) => 
            {
                //count correct, incorrect, and backspace strokes
                if (el.correct) correctKeystrokes++
                else if (el.typedInputLetter != 'Backspace') incorrectKeystrokes++
                
            })
    
            //count correct words
            wordResultsArray.forEach((el, idx) => {
                if (el === wordBank[idx].word) correctWords++
            })

            // fetch('http://localhost:3000/api/example/wordbank')
            // .then((response) => response.json())
            // .then((result) => {
            //   setWordBank(result);
            // })
            // .catch((error) => {
            //   console.error('Error fetching data:', error);
            // });
        }
    },[testResults, viewResults])



        const handleClick = (e) => {
            //GET new words for the wordbank components
            //fix latency
            fetch('http://localhost:3000/api/example/wordbank')
            .then((response) => response.json())
            .then((result) => {
              setWordBank(result);
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });

            //reset all state variables
            setViewResults(false);
            setLetterIdx(-1);
            setWordIdx(0);
            setTestResults({});
            setWordResultsArray([]);
            setSeconds(6);
            setText("")

            //reset component variables
            correctKeystrokes = 0;
            incorrectKeystrokes = 0;
            correctWords = 0;


        }
    

  return (
    <div>
        {viewResults ? 
        <>
        <div>wpm: {wordIdx}</div>
        <div>keystrokes: {keystrokes}</div>
        <div>Correct Words: {correctWords}</div>
        <div>Incorrect Words: {wordResultsArray.length - correctWords}</div>
        <div>Correct Letters:  {correctKeystrokes}</div>
        <div>Letter Accuracy: {correctKeystrokes/(keystrokes-wordIdx)}</div>

        <button onClick={handleClick}>Try Again</button>
        <div></div></> : <div/> }
        
    </div>
  )
}

export default Results