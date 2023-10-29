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

    const { byLetterBarChartData, setByLetterBarChartData, user, slowestCombination, setSlowestCombination, medianTypingSpeed, setMedianTypingSpeed, testDuration, setTestDuration, displayCorrectKeystrokes, setDisplayCorrectKeystrokes, wpm, setWpm, lineChartYData, setLineChartYData, lineChartXData, setLineChartXData, heatMapData, setHeatMapData, colorsArray, setColorsArray, data, setData, text, setText, wordIdx, setWordIdx, viewResults, setViewResults, testResults, setTestResults, wordResultsArray, setWordResultsArray , wordBank, setWordBank, setLetterIdx, seconds, setSeconds } = useContext(Context)
    const keystrokes = Object.keys(testResults).length;

    const [displayIncorrectKeystrokes, setDisplayIncorrectKeystrokes] = useState(0);
    const [correctWpm, setCorrectWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);

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
    let frequencyOfLetters = {};
    let averageTimePerLetter = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
    let timeTestBarChartData = [];
    let numSpaces = 0;

    let slowestWord = "";
    let slowestWordTime = -Infinity;
    let slowestWordIdx;

    let wordsPerMinute;
    let correctWordsPerMinute;

    function letterToIndex(letter) {
        const charCodeA = 'A'.charCodeAt(0); // Unicode value of 'A'
        const charCodeLowerCaseA = 'a'.charCodeAt(0); // Unicode value of 'a'
      
        // Get the Unicode value of the input letter
        const charCode = letter.toUpperCase().charCodeAt(0);
      
        // Calculate the index based on the Unicode value of the letter
        if (charCode >= charCodeA && charCode <= charCodeA + 25) {
          // Uppercase letter (A-Z)
          return charCode - charCodeA;
        } else if (charCode >= charCodeLowerCaseA && charCode <= charCodeLowerCaseA + 25) {
          // Lowercase letter (a-z)
          return charCode - charCodeLowerCaseA;
        } else {
          // Not a valid letter
          return -1;
        }
      }

      function indexToLetter(index) {
        if (index >= 0 && index < 26) {
          // Valid index (0-25)
          const charCodeA = 'A'.charCodeAt(0); // Unicode value of 'A'
          // Calculate the Unicode value of the corresponding letter and convert it to a character
          return String.fromCharCode(charCodeA + index);
        } else {
          // Invalid index
          return null;
        }
      }
      


    // useEffect(() => {
    //     AOS.init({duration: 2000});
    // }, [])

    useEffect(() => {
        correctKeystrokes = 0;
        incorrectKeystrokes = 0;
        correctWords = 0;
        testResultsArray = Object.values(testResults);
        console.log('test results array', testResultsArray)


        if (viewResults) {
            const tempColorsArray = [];
            testResultsArray.forEach((el, idx) => 
            {
                //count correct, incorrect, and backspace strokes
                if (el.correct) {
                    correctKeystrokes++
                    //fill out by letter array
                    //check to see if letter exists in object
                    // { letter: 'A', time: 100 },
                    if(idx > 0) {
                        let timeElapsed = new Date(timeStampsArray[idx])-new Date(timeStampsArray[idx-1])
                        // if (!frequencyOfLetters[el.typedInputLetter]) {
                        //     frequencyOfLetters[el.typedInputLetter] = 1;
                        //     averageTimePerLetter[letterToIndex(el.typedInputLetter)] = timeElapsed
                        // } else {
                        //     frequencyOfLetters[el.typedInputLetter]++;
                        //     averageTimePerLetter[letterToIndex(el.typedInputLetter)] = averageTimePerLetter[letterToIndex(el.typedInputLetter)]
                        // }
                        if (!averageTimePerLetter[letterToIndex(el.typedInputLetter)]) averageTimePerLetter[letterToIndex(el.typedInputLetter)] = [];
                        averageTimePerLetter[letterToIndex(el.typedInputLetter)].push(timeElapsed);
                    }
 
                }
                else if (el.typedInputLetter != 'Backspace' && el.typedInputLetter!= " ") incorrectKeystrokes++
                else if (el.typedInputLetter == " ") numSpaces++
                console.log("num spaces", numSpaces)
                tempColorsArray.push(el.color);

                //find the slowest word

                //fill out heat map data
                if (el.correct && idx > 0) {
                    // heatMapData[testResultsArray.typedInputLetter]
                }
            })
            // //calculate average for each element of averageTimePerLetter array
            for (let i = 0; i < averageTimePerLetter.length; i++) {
                let sum = 0;
                let size = averageTimePerLetter[i].length;
                for(let j = 0; j < averageTimePerLetter[i].length; j++) {
                    sum += averageTimePerLetter[i][j];
                }
                averageTimePerLetter[i] = sum/size;
            }
            // //update TimeTestBarChart data object
            for (let i = 0; i < averageTimePerLetter.length; i++) {
                timeTestBarChartData.push({
                    'letter': indexToLetter(i),
                    'time': averageTimePerLetter[i]
                })
            }

            //update the state variable
            setByLetterBarChartData(timeTestBarChartData);

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

            let duration = Math.round((new Date(timeStampsArray[timeStampsArray.length-1]) - new Date(timeStampsArray[0]))/1000)
            wordsPerMinute = Math.round(correctKeystrokes/5*60/duration)
            correctWordsPerMinute = Math.round((correctKeystrokes-incorrectKeystrokes)/5*60/duration);
            let accuracy = Math.round(correctWordsPerMinute/wordsPerMinute*100);

            //update react state variables
            setDisplayCorrectKeystrokes(correctKeystrokes)
            setDisplayIncorrectKeystrokes(incorrectKeystrokes)
            setLineChartXData(timeStampsArray)
            setLineChartYData(grosswpmArray);
            setData(newData)
            setHeatMapData(tempHeatMapData);
            setWpm(wordsPerMinute);
            setCorrectWpm(correctWordsPerMinute);
            setAccuracy(accuracy)
            setTestDuration(Math.round(new Date(timeStampsArray[timeStampsArray.length-1]) - new Date(timeStampsArray[0])));

            //count correct words
            wordResultsArray.forEach((el, idx) => {
                if (el === wordBank[idx].word) correctWords++
            })
            // if (viewResults) AOS.init({duration: 2000});


console.log("user info ", user)
            // update the test results cluster
            // fetch('http://localhost:3000/api/testCompleted', {
            //     method: 'PUT',
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         "id": user._id,
            //         "date": new Date(),
            //         "wpm": wordsPerMinute,
            //         "accuracy": accuracy,
            //         "duration": duration
            //     }),
            //   })
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
        <div>Total WPM: {wpm}</div>
        <div>Correct WPM: {correctWpm}</div>
        <div>Accuracy: {accuracy}%</div>
        {/* <div>{JSON.stringify(data)}</div> */}
        <div>
            { wpm > 40 ? <>+</> : <></> } 
            {Math.round((wpm/40 - 1)*100)}
            %
            {wpm > 40 ? <> faster </> : <> slower </> }
            than average
        </div>
        <button onClick={handleClick}>Try Again</button>
        </>
        
 </motion.div>
  )
}

export default Results