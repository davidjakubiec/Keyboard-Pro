import React, { useContext, useState, useEffect, useRef, Component } from 'react'
import { Context } from './App'
import Timer from './Timer'
import TimestampTextBox from './TimestampTextBox'
import * as d3 from 'd3';

const Results = () => {

    const { data, setData, text, setText, wordIdx, setWordIdx, viewResults, setViewResults, testResults, setTestResults, wordResultsArray, setWordResultsArray , wordBank, setWordBank, setLetterIdx, seconds, setSeconds } = useContext(Context)
    const keystrokes = Object.keys(testResults).length;

    let correctKeystrokes = 0;
    let incorrectKeystrokes = 0;
    let correctWords = 0;
    let testResultsArray = Object.values(testResults);
    let timeStampsArray = Object.keys(testResults);


    useEffect(() => {
        correctKeystrokes = 0;
        incorrectKeystrokes = 0;
        correctWords = 0;
        testResultsArray = Object.values(testResults);


        if (viewResults) {
            testResultsArray.forEach((el, idx) => 
            {
                //count correct, incorrect, and backspace strokes
                if (el.correct) correctKeystrokes++
                else if (el.typedInputLetter != 'Backspace') incorrectKeystrokes++



                // 23react-dom.development.js:86 Warning: Maximum update depth exceeded. 
                // This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
                
            })
            console.log(timeStampsArray[0], typeof(new Date(timeStampsArray[1])), new Date(timeStampsArray[1])-new Date(timeStampsArray[0]))
            // setData([{label: 'E', value: 30}])
            const newData = []
            for (let i = 0; i < testResultsArray.length; i++) {
                newData.push({
                    label: i,
                    value: i > 0 ? new Date(timeStampsArray[i])-new Date(timeStampsArray[i-1]) : 0
                })
            }
            setData(newData)

            //count correct words
            wordResultsArray.forEach((el, idx) => {
                if (el === wordBank[idx].word) correctWords++
            })

        }
    },[testResults, viewResults])


// if (viewResults) console.log('test1', JSON.stringify(data))
    //   if (viewResults) setData([{ label: 'E', value: 30}])
    

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
        <div>{JSON.stringify(data)}</div>
        <button onClick={handleClick}>Try Again</button>
        <div></div></> : <div/> }
        
    </div>
  )
}

export default Results