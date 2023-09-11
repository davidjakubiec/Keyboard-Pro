import React, { useContext, useState, useEffect } from 'react'
import { Context } from './App'
import Timer from './Timer'
import TimestampTextBox from './TimestampTextBox'

const Results = () => {
    const { wordIdx, setWordIdx, viewResults, setViewResults, testResults, setTestResults, wordResultsArray, setWordResultsArray , wordBank, setWordBank } = useContext(Context)
    const keystrokes = Object.keys(testResults).length;
    let correctKeystrokes = 0;
    let incorrectKeystrokes = 0;
    let correctWords = 0;
    let testResultsArray = Object.values(testResults);

    if (viewResults) {
        testResultsArray.forEach((el) => 
        {
            //count correct, incorrect, and backspace strokes
            if (el.correct) correctKeystrokes++
            else if (el.typedInputLetter != 'Backspace') incorrectKeystrokes++;
            
        })

        //count correct words
        wordResultsArray.forEach((el, idx) => {
            if (el === wordBank[idx].word) correctWords++;
        })
    }

        const handleClick = (e) => {
            // e.PreventDefault()
            setViewResults(false);

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