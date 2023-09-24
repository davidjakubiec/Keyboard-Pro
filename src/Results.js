import React, { useContext, useState, useEffect, useRef, Component } from 'react'
import { Context } from './App'
import Timer from './Timer'
import TimestampTextBox from './TimestampTextBox'
import * as d3 from 'd3';
import './App.scss'
import AOS from 'aos'
import 'aos/dist/aos.css'; 
import { motion, useInView, useAnimation } from "framer-motion";

const Results = () => {

    const {  colorsArray, setColorsArray, data, setData, text, setText, wordIdx, setWordIdx, viewResults, setViewResults, testResults, setTestResults, wordResultsArray, setWordResultsArray , wordBank, setWordBank, setLetterIdx, seconds, setSeconds } = useContext(Context)
    const keystrokes = Object.keys(testResults).length;

    let correctKeystrokes = 0;
    let incorrectKeystrokes = 0;
    let correctWords = 0;
    let testResultsArray = Object.values(testResults);
    let timeStampsArray = Object.keys(testResults);

    // useEffect(() => {
    //     AOS.init({duration: 2000});
    // }, [])

    useEffect(() => {
        correctKeystrokes = 0;
        incorrectKeystrokes = 0;
        correctWords = 0;
        testResultsArray = Object.values(testResults);


        if (viewResults) {
            const tempColorsArray = [];
            testResultsArray.forEach((el, idx) => 
            {
                //count correct, incorrect, and backspace strokes
                if (el.correct) correctKeystrokes++
                else if (el.typedInputLetter != 'Backspace') incorrectKeystrokes++
                tempColorsArray.push(el.color);
            })
            setColorsArray(tempColorsArray);

            const newData = []
            for (let i = 0; i < testResultsArray.length; i++) {
                newData.push({
                    label: `${i} ${testResultsArray[i].typedInputLetter}`,
                    value: i > 0 ? new Date(timeStampsArray[i])-new Date(timeStampsArray[i-1]) : 0
                })
            }
            setData(newData)

            //count correct words
            wordResultsArray.forEach((el, idx) => {
                if (el === wordBank[idx].word) correctWords++
            })
            // if (viewResults) AOS.init({duration: 2000});
        }
    },[testResults, viewResults, wordResultsArray])

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
            setSeconds(60);
            setText("")
            setData([])

            //reset component variables
            correctKeystrokes = 0;
            incorrectKeystrokes = 0;
            correctWords = 0;


        }
    

  return (
    // id="results-first" data-aos="fade-right"
    <motion.div 
    variants={{
        hidden: {opacity: 0, y: 75},
        visible: {opacity: 1, y: 0}
    }}
    initial="hidden"
    whileInView="visible"
    transition={{ delay: 0.2 }}
    // viewport={{
    //     once: true,
    // }}
    className="results-first"
    >

        <>
        <div>WPM: {wordIdx}</div>
        <div>keystrokes: {keystrokes}</div>
        <div>Correct Words: {correctWords}</div>
        <div>Incorrect Words: {wordResultsArray.length - correctWords}</div>
        <div>Correct Letters:  {correctKeystrokes}</div>
        <div>Letter Accuracy: {correctKeystrokes/(keystrokes-wordIdx)}</div>
        {/* <div>{JSON.stringify(data)}</div> */}
        <button onClick={handleClick}>Try Again</button>
        </> 
        
    </motion.div>
  )
}

export default Results