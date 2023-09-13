import React, { useState } from 'react';
import TimestampTextBox from './TimestampTextBox';
import WordBank from './WordBank';
import Timer from './Timer'
import Results from './Results'
import BarChart from './BarChart';

export const Context = React.createContext();

export function App() {


    const [data, setData] = useState([
        // { label: 'A', value: 10 },
        // { label: 'B', value: 20 },
        // { label: 'C', value: 15 },
        // { label: 'D', value: 29 },
      ])

    const [wordIdx, setWordIdx] = useState(0);
    const [seconds, setSeconds] = useState(2);
    const [text, setText] = useState('')
    const [letterIdx, setLetterIdx] = useState(-1);
    const [wordResultsArray, setWordResultsArray] = useState([]);
    const [wordBank, setWordBank] = useState([]);
    const [testResults, setTestResults] = useState({});
    const [testInProgress, setTestInProgress] = useState(false);
    const [viewResults, setViewResults] = useState(false);

    return (
  
        <Context.Provider value={{ data, setData, text, setText, wordIdx, setWordIdx, letterIdx, setLetterIdx, wordBank, setWordBank, testResults, setTestResults, testInProgress, setTestInProgress, viewResults, setViewResults, wordResultsArray, setWordResultsArray, seconds, setSeconds}}>
            <h1> Welcome { new Date().toString() } </h1>
             <WordBank />
            <TimestampTextBox /> 
            <Timer /> 
            <Results />
            <BarChart />
            <div></div>
        </Context.Provider>
       

    );
};