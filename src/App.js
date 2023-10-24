import React, { useEffect, useState } from 'react';
import TimestampTextBox from './TimestampTextBox';
import WordBank from './WordBank';
import Timer from './Timer'
import Results from './Results'
import BarChart from './BarChart';
import Training from './Training';
import HeatMap from './HeatMap';
import LineChart from './LineChart';




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
    const [heatMapData, setHeatMapData] = useState({});
    const [lineChartYData, setLineChartYData] = useState([]);
    const [lineChartXData, setLineChartXData] = useState([]);
    const [wpm, setWpm] = useState(0);
    const [displayCorrectKeystrokes, setDisplayCorrectKeystrokes] = useState(0);
    const [testDuration, setTestDuration] = useState(0);
    const [medianTypingSpeed, setMedianTypingSpeed] = useState(0);
    const [hovering, setHovering] = useState(null);
    const [xModal, setXModal] = useState(0);
    const [yModal, setYModal] = useState(0);

    const contextObject = { editTime, setEditTime, colorsArray, setColorsArray, data, setData, text, setText, wordIdx, setWordIdx, letterIdx, setLetterIdx, 
        wordBank, setWordBank, testResults, setTestResults, testInProgress, setTestInProgress, viewResults, setViewResults, wordResultsArray, 
        xModal, setXModal, yModal, setYModal, hovering, setHovering, medianTypingSpeed, setMedianTypingSpeed, testDuration, setTestDuration, displayCorrectKeystrokes, setDisplayCorrectKeystrokes, wpm, setWpm, setWordResultsArray, seconds, setSeconds, heatMapData, setHeatMapData, lineChartYData, setLineChartYData, lineChartXData, setLineChartXData}


    return (
        <div className="flex-container">
        <Context.Provider value={ contextObject } >
        <div>
            {!viewResults ? 
            <section className='test'>
                <WordBank />
                <div className="textbox-timer-container">
                    <TimestampTextBox /> 
                    <Timer /> 
                </div>
            </section>
            :
            <div>   
            <section className='test-results'>
                <Results />
            </section>
            <section className='test-barchart' id='test-barchart'>
                <BarChart />
            </section>
            <section className='test-heatmap'>
                <HeatMap />
            </section>
            <section className='test-linechart'>
                <LineChart />
            </section>
            </div>
            }
        </div>
        </Context.Provider>
        </div>
    );
};