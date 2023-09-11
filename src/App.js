import React, { useState } from 'react';
import TimestampTextBox from './TimestampTextBox';
import WordBank from './WordBank';
import Timer from './Timer'
import Results from './Results'


export const Context = React.createContext();

export function App() {

    const [wordIdx, setWordIdx] = useState(0);
    const [seconds, setSeconds] = useState(6);
    const [text, setText] = useState('')
    const [letterIdx, setLetterIdx] = useState(-1);
    const [wordResultsArray, setWordResultsArray] = useState([]);
    const [wordBank, setWordBank] = useState([]);
    const [testResults, setTestResults] = useState({});
    const [testInProgress, setTestInProgress] = useState(false);
    const [viewResults, setViewResults] = useState(false);

    return (
  
        <Context.Provider value={{ text, setText, wordIdx, setWordIdx, letterIdx, setLetterIdx, wordBank, setWordBank, testResults, setTestResults, testInProgress, setTestInProgress, viewResults, setViewResults, wordResultsArray, setWordResultsArray, seconds, setSeconds}}>
            <h1> Welcome { new Date().toString() } </h1>
             <WordBank />
            <TimestampTextBox /> 
            <Timer /> 
            <Results />
            <div></div>
        </Context.Provider>
       

    );
};