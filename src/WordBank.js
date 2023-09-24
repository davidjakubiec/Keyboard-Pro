import React, { useState, useEffect, useContext, useRef } from 'react'
import { Context } from './App'

const WordBank = () => {
    const el = useRef(null);
    const [placeholder, setPlaceholder] = useState('');
    const {wordIdx, setWordIdx, letterIdx, setLetterIdx, wordBank, setWordBank, testResults, setTestResults, viewResults} = useContext(Context);

    useEffect(() => {
        fetch('http://localhost:3000/api/example/wordbank')
          .then((response) => response.json())
          .then((result) => {
            setWordBank(result);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
      const words = wordBank.map((row) => row.word);


  return (
      <div className="wordbank-container">
        {
          words.map((str, index) => (
            <>
              <span className="wordbank" style={{ backgroundColor: index === 0 ? '#D3D3D3' : 'transparent' }} id={index}>{str}</span>
              <span className="wordbank">{" "}</span>
            </>
          ))
        }
      </div>
  )
}

export default WordBank