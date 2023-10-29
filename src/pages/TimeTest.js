import React, { useContext } from "react"
import { Context } from '../App'
import TimestampTextBox from '../TimestampTextBox';
import WordBank from '../WordBank';
import Timer from '../Timer'
import Results from '../Results'
import BarChart from '../BarChart';
import TimeTestResultsBarChart from "../components/TimeTestResultsBarChart";

import OAuthButton from '../OauthButton';




const TimeTest = () => {

    const { editTime, setEditTime, colorsArray, setColorsArray, data, setData, text, setText, wordIdx, setWordIdx, letterIdx, setLetterIdx, 
        wordBank, setWordBank, testResults, setTestResults, testInProgress, setTestInProgress, viewResults, setViewResults, wordResultsArray, 
        slowestCombination, setSlowestCombination, xModal, setXModal, yModal, setYModal, hovering, setHovering, medianTypingSpeed, setMedianTypingSpeed, testDuration, setTestDuration, displayCorrectKeystrokes, setDisplayCorrectKeystrokes, wpm, setWpm, setWordResultsArray, seconds, setSeconds, heatMapData, setHeatMapData, lineChartYData, setLineChartYData, lineChartXData, setLineChartXData} =useContext(Context)
    
    
    return (
        <div>
 <div className="flex-container">

        {!viewResults ? 
            <section className='test'>
                {/* <OAuthButton/> */}
                <WordBank />
                <div className="textbox-timer-container">
                    <TimestampTextBox /> 
                    <Timer /> 
                </div>
            </section>
            :
            <div> 
                <div className="results-container">  
            <section className='test-results'>
                <Results />
            </section>
            <section className='test-barchart' id='test-barchart'>
                <TimeTestResultsBarChart />
            </section>
            </div>
            {/* <section className='test-heatmap'>
                <HeatMap />
            </section> */}
            {/* <section className='test-linechart'>
                <LineChart />
            </section> */}
            </div>
            }
        </div>

         
        </div>
    )
}

export default TimeTest;