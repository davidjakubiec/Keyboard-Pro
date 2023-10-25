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

    const { slowestCombination, setSlowestCombination, medianTypingSpeed, setMedianTypingSpeed, testDuration, setTestDuration, displayCorrectKeystrokes, setDisplayCorrectKeystrokes, wpm, setWpm, lineChartYData, setLineChartYData, lineChartXData, setLineChartXData, heatMapData, setHeatMapData, colorsArray, setColorsArray, data, setData, text, setText, wordIdx, setWordIdx, viewResults, setViewResults, testResults, setTestResults, wordResultsArray, setWordResultsArray , wordBank, setWordBank, setLetterIdx, seconds, setSeconds } = useContext(Context)
    const keystrokes = Object.keys(testResults).length;

    const [displayIncorrectKeystrokes, setDisplayIncorrectKeystrokes] = useState(0);

    let correctKeystrokes = 0;
    let incorrectKeystrokes = 0;
    let correctWords = 0;
    let testResultsArray = Object.values(testResults);
    let timeStampsArray = Object.keys(testResults);
    let tempHeatMapData = {};
    let grosswpmArray = [];
    let tempXaxis = [];
    let typingSpeedArray = [];
    let slowestCombinationArray = [];

    let slowestWord = "";
    let slowestWordTime = -Infinity;
    let slowestWordIdx;

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

                //find the slowest word

                //fill out heat map data
                if (el.correct && idx > 0) {
                    // heatMapData[testResultsArray.typedInputLetter]
                }
            })
            setColorsArray(tempColorsArray);

            const newData = []
            for (let i = 0; i < testResultsArray.length; i++) {
                newData.push({
                    label: `${i} ${testResultsArray[i].typedInputLetter}`,
                    value: i > 0 ? new Date(timeStampsArray[i])-new Date(timeStampsArray[i-1]) : 0
                })

                //fill out heat map data
                //come back and actually average each addition to the heat map object
                if (i > 0) {

                    if (!tempHeatMapData[testResultsArray[i].typedInputLetter]) tempHeatMapData[testResultsArray[i].typedInputLetter] = {}
                    tempHeatMapData[testResultsArray[i].typedInputLetter][testResultsArray[i-1].typedInputLetter] = new Date(timeStampsArray[i]) - new Date(timeStampsArray[i-1])  
                }

                //fill out grosswpmArray
                //number of keystrokes divided by 5 * 60 / amount of time
                tempXaxis.push(testResultsArray[i].typedInputLetter);
                grosswpmArray[i] = i / 5 * 60 / ((new Date(timeStampsArray[i]) - new Date(timeStampsArray[0]))/1000)
            }

            //find median typing speed
            for (let i = 1; i < timeStampsArray.length; i++) {
                typingSpeedArray.push(new Date(timeStampsArray[i]) - new Date(timeStampsArray[i-1]));
            }
            //before sorting typing speed array, find slowest combination
            for (let i = 2; i < typingSpeedArray.length; i++) {
                //check to make sure they are correct
                const correct = ( testResultsArray[i].correct && testResultsArray[i-1].correct && testResultsArray[i-2].correct )
                const currTime = typingSpeedArray[i]+typingSpeedArray[i-1]+typingSpeedArray[i-2]
                if (currTime > slowestWordTime && correct && testResultsArray[i]) {
                    slowestWordTime = currTime;
                    slowestWordIdx = i-2;
                    console.log('hi')
                }
                console.log("loop: ", currTime, slowestWordIdx)
            }
            console.log("test1: ", slowestWordIdx)


            typingSpeedArray.sort((a,b) => a - b);
            if (typingSpeedArray % 2 === 0) {
                setMedianTypingSpeed((typingSpeedArray[Math.floor(typingSpeedArray.length/2)]+typingSpeedArray[Math.floor(typingSpeedArray.length/2)+1])/2)
            } else {
                setMedianTypingSpeed(typingSpeedArray[Math.floor(typingSpeedArray.length/2)])
            }

            setDisplayCorrectKeystrokes(correctKeystrokes)
            setDisplayIncorrectKeystrokes(incorrectKeystrokes)
            setLineChartXData(timeStampsArray)
            setLineChartYData(grosswpmArray);
            setData(newData)
            setHeatMapData(tempHeatMapData);
            setWpm(correctKeystrokes);
            setTestDuration(Math.round(new Date(timeStampsArray[timeStampsArray.length-1]) - new Date(timeStampsArray[0])));

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
        <div>Total WPM: {Math.round(displayCorrectKeystrokes/5*60/(Math.round((new Date(timeStampsArray[timeStampsArray.length-1]) - new Date(timeStampsArray[0]))/1000)))}</div>
        <div>Correct WPM: {Math.round((displayCorrectKeystrokes-displayIncorrectKeystrokes)/5*60/(Math.round((new Date(timeStampsArray[timeStampsArray.length-1]) - new Date(timeStampsArray[0]))/1000)))}</div>
        <div>Accuracy: {Math.round(1-displayIncorrectKeystrokes/displayCorrectKeystrokes,2)*100}%</div>
        {/* <div>{JSON.stringify(data)}</div> */}
        <div>
            {
                Math.round(displayCorrectKeystrokes/5*60/(Math.round((new Date(timeStampsArray[timeStampsArray.length-1]) - new Date(timeStampsArray[0]))/1000))) > 40 ? <>+</> : <>-</> 
            } 
            {(Math.round(displayCorrectKeystrokes/5*60/(Math.round((new Date(timeStampsArray[timeStampsArray.length-1]) - new Date(timeStampsArray[0]))/1000)))/40 - 1)*100}
            %
            {Math.round(displayCorrectKeystrokes/5*60/(Math.round((new Date(timeStampsArray[timeStampsArray.length-1]) - new Date(timeStampsArray[0]))/1000)), 2) > 40 ? <> faster </> : <> slower </> }
            than average
        </div>
        <button onClick={handleClick}>Try Again</button>
        </>
        
    </motion.div>
  )
}

export default Results