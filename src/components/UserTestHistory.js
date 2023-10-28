import React, { useEffect, useContext } from 'react'
import { Context } from '../App'

const UserTestHistory = () => {
    const {userHistory, setUserHistory} = useContext(Context);

  useEffect(() => {
    fetch('http://localhost:3000/results', {
      method: 'GET',
      credentials: 'include', 
    })
    .then(results => results.json())
    .then(data => setUserHistory(data))
  }, [])

  return (
    <div className='user-test-history-container'>

<h2>Your Test History</h2>

  <table border="1"> 
    <tr> 
      <th>Test Number</th> 
      <th>Date</th> 
      <th>Words Per Minute</th> 
      <th>Accuracy</th>
      <th>Duration</th>
      {/* <th>Text Sample</th> */}
    </tr>
    {userHistory ? userHistory.map((el, index) => (
        <tr>
            <td>{index+1}</td>
            <td>{el.date}</td>
            <td>{el.wpm}</td>
            <td>{el.accuracy}</td>
            <td>{el.duration}</td>
            {/* <td>{el['text-sample']}</td> */}
        </tr>
    )):<div></div>}
  </table>


    </div>
  )
}

export default UserTestHistory