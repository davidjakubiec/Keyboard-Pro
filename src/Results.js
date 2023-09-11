import React, { useContext, useState } from 'react'
import { Context } from './App'
import Timer from './Timer'
import TimestampTextBox from './TimestampTextBox'

const Results = () => {
    const { wordIdx, setWordIdx, viewResults, setViewResults, testResults, setTestResults, correctWordCount, setCorrectWordCount } = useContext(Context)
    const keystrokes = Object.keys(testResults).length;
    let correctKeystrokes = 0;
    let incorrectKeystrokes = 0;
    let testResultsArray = Object.values(testResults);

    if (viewResults) testResultsArray.forEach((el) => 
        {
            //count correct, incorrect, and backspace strokes
            if (el.correct) correctKeystrokes++
            else if (el.typedInputLetter != 'Backspace') incorrectKeystrokes++;
        })

  return (
    <div>
        <div>wpm: {wordIdx/6}</div>
        <div>keystrokes: {keystrokes}</div>
        <div>Correct Words: {correctWordCount}</div>
        <div>Incorrect Words: </div>
        <div>Correct Letters:  {correctKeystrokes}</div>
        <div>Letter Accuracy: {correctKeystrokes/(keystrokes-wordIdx)}</div>
        <div></div>
    </div>
  )
}

export default Results