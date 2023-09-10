import React, { useState } from 'react';
import TimestampTextBox from './TimestampTextBox';
import WordBank from './WordBank';
import Timer from './Timer'


export const Context = React.createContext();

export function App() {

    const [wordIdx, setWordIdx] = useState(0);
    const [letterIdx, setLetterIdx] = useState(-1);
    const [wordBank, setWordBank] = useState([]);
    const [testResults, setTestResults] = useState({});
    const [testInProgress, setTestInProgress] = useState(false);



    return (
        <Context.Provider value={{ wordIdx, setWordIdx, letterIdx, setLetterIdx, wordBank, setWordBank, testResults, setTestResults, testInProgress, setTestInProgress}}>

            <h1> Welcome { new Date().toString() } </h1>
            <WordBank />
            <TimestampTextBox />
            <Timer />
        </Context.Provider>
    );
};