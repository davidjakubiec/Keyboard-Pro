import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import TimestampTextBox from './TimestampTextBox';
import WordBank from './WordBank';
import Timer from './Timer'
import Results from './Results'
import BarChart from './BarChart';
import Training from './Training';
import HeatMap from './HeatMap';
import LineChart from './LineChart';
import OAuthButton from './OauthButton';
//pages
import TimeTest from './pages/TimeTest'
import Profile from './pages/Profile';



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
    const [slowestCombination, setSlowestCombination] = useState([]);

    const contextObject = { editTime, setEditTime, colorsArray, setColorsArray, data, setData, text, setText, wordIdx, setWordIdx, letterIdx, setLetterIdx, 
        wordBank, setWordBank, testResults, setTestResults, testInProgress, setTestInProgress, viewResults, setViewResults, wordResultsArray, 
        slowestCombination, setSlowestCombination, xModal, setXModal, yModal, setYModal, hovering, setHovering, medianTypingSpeed, setMedianTypingSpeed, testDuration, setTestDuration, displayCorrectKeystrokes, setDisplayCorrectKeystrokes, wpm, setWpm, setWordResultsArray, seconds, setSeconds, heatMapData, setHeatMapData, lineChartYData, setLineChartYData, lineChartXData, setLineChartXData
    }


    return (
        <div className="flex-container">
        <Context.Provider value={ contextObject } >
        <BrowserRouter>
            <header>
                <nav>
                <NavLink to='/'>Time Test</NavLink>
                <NavLink to='/profile'>Profile</NavLink>
                </nav>
            </header>
            <main>
                <Routes>
                    <Route path='/' element={<TimeTest/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                </Routes>
            </main>
        </BrowserRouter>
        </Context.Provider>
        </div>
    );
};