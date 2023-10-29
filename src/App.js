import React, { createRef, useEffect, useState } from 'react';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';

//pages
import TimeTest from './pages/TimeTest'
import Profile from './pages/Profile';
import Faq from './pages/help/Faq';
import Contact from './pages/help/Contact';
import NotFound from './pages/NotFound';
import Careers, { careersLoader } from './pages/Careers/Careers';
import CareerDetails, { careerDetailsLoader } from './pages/Careers/CareerDetails';
import CareersError from './pages/Careers/CareersError';

//layouts
import RootLayout from './layouts/RootLayout';
import HelpLayout from './layouts/HelpLayout';
import CareersLayout from './layouts/CareersLayout';




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
    const [testDuration, setTestDuration] = useState(60);
    const [medianTypingSpeed, setMedianTypingSpeed] = useState(0);
    const [hovering, setHovering] = useState(null);
    const [xModal, setXModal] = useState(0);
    const [yModal, setYModal] = useState(0);
    const [slowestCombination, setSlowestCombination] = useState([]);
    const [user, setUser] = useState();
    const [userHistory, setUserHistory] = useState();
    const [byLetterBarChartData, setByLetterBarChartData] = useState([]);

    const contextObject = { editTime, setEditTime, colorsArray, setColorsArray, data, setData, text, setText, wordIdx, setWordIdx, letterIdx, setLetterIdx, 
        wordBank, setWordBank, testResults, setTestResults, testInProgress, setTestInProgress, viewResults, setViewResults, wordResultsArray, 
        byLetterBarChartData, setByLetterBarChartData, userHistory, setUserHistory, user, setUser, slowestCombination, setSlowestCombination, xModal, setXModal, yModal, setYModal, hovering, setHovering, medianTypingSpeed, setMedianTypingSpeed, testDuration, setTestDuration, displayCorrectKeystrokes, setDisplayCorrectKeystrokes, wpm, setWpm, setWordResultsArray, seconds, setSeconds, heatMapData, setHeatMapData, lineChartYData, setLineChartYData, lineChartXData, setLineChartXData
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<RootLayout/>}>
                <Route index element={<TimeTest/>}/>
                <Route path='profile' element={<Profile/>}/>

                <Route path='help' element={<HelpLayout/>}>
                    <Route path='faq' element={<Faq/>} />
                    <Route path='contact' element={<Contact/>}/>
                </Route>

                <Route path='careers' element={<CareersLayout />} errorElement={<CareersError />}>
                    <Route 
                        index
                        element={<Careers/>}
                        loader={careersLoader}
                    />
                    <Route 
                        path=":id"
                        element={<CareerDetails />}
                        loader={careerDetailsLoader}       
                    />

                </Route>


                
                <Route path='*' element={<NotFound/>}/>
            </Route>
        )
        )

    return (
        <div className="flex-container">
            <Context.Provider value={ contextObject } >
                <RouterProvider router={router} />
            </Context.Provider>
        </div>
    );
};