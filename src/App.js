import React, { useState } from 'react';
import TimestampTextBox from './TimestampTextBox';
import WordBank from './WordBank';
import Timer from './Timer'
import Results from './Results'
import BarChart from './BarChart';
import ScrollAnimaiton from './ScrollAnimaiton';

export const Context = React.createContext();

export function App() {


    const [data, setData] = useState([]);
    const [editTime, setEditTime] = useState(false);
    const [colorsArray, setColorsArray] = useState([]);
    const [wordIdx, setWordIdx] = useState(0);
    const [seconds, setSeconds] = useState(60);
    const [text, setText] = useState('');
    const [letterIdx, setLetterIdx] = useState(-1);
    const [wordResultsArray, setWordResultsArray] = useState([]);
    const [wordBank, setWordBank] = useState([]);
    const [testResults, setTestResults] = useState({});
    const [testInProgress, setTestInProgress] = useState(false);
    const [viewResults, setViewResults] = useState(false);

    const contextObject = { editTime, setEditTime, colorsArray, setColorsArray, data, setData, text, setText, wordIdx, setWordIdx, letterIdx, setLetterIdx, 
        wordBank, setWordBank, testResults, setTestResults, testInProgress, setTestInProgress, viewResults, setViewResults, wordResultsArray, 
        setWordResultsArray, seconds, setSeconds}

    return (
        <div class="flex-container">
        <Context.Provider value={ contextObject }>
            {/* <WordBank />
            <div class="textbox-timer-container">
            <TimestampTextBox /> 
            <Timer /> 
            </div>
            <Results />
            <BarChart /> */}
            <ScrollAnimaiton />
        </Context.Provider>
        </div>

    );
};