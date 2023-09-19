import React, { useState, useEffect, useContext } from 'react'
import { Context } from './App'

const WordBank = () => {
    
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



      useEffect(() => {
        const scrollButton = document.getElementById('scrollButton');
        const scrollableList = document.querySelector('.wordbank-container');

        scrollButton.addEventListener('click', () => {
          // Scroll the scrollable list by a specified amount
          scrollableList.scrollTop += 74; // Adjust the value as needed
        });
      }, [])


  return (
    <div >
      <button id="scrollButton">button</button>
      <div class="wordbank-container">
        { viewResults ? <div></div> : 
                words.map((str, index) => (
                  <>
                  <span className="wordbank" style={{ backgroundColor: index === 0 ? '#D3D3D3' : 'transparent' }} id={index}>{str}</span>
                  <span className="wordbank">{" "}</span>
                  </>
              ))
        }
      </div>
    </div>
    
  )
}

export default WordBank