import React from 'react'

const UserTestHistory = () => {
    const sampleData = [{
        "test-number": 1,
        "date": "01/01/02",
        "wpm": 100,
        "accuracy": 95,
        "duration": 60,
        "text-sample": "political trophy has ..."
    },
    {
        "test-number": 2,
        "date": "01/02/02",
        "wpm": 200,
        "accuracy": 195,
        "duration": 60,
        "text-sample": "wandering monster with ..."
    }
];

  return (
    <div className='user-test-history-container'>

<h2>Sample Table</h2>

  <table border="1"> 
    <tr> 
      <th>Test Number</th> 
      <th>Date</th> 
      <th>Words Per Minute</th> 
      <th>Accuracy</th>
      <th>Duration</th>
      <th>Text Sample</th>
    </tr>
    {sampleData.map((el, index) => (
        <tr>
            <td>{el['test-number']}</td>
            <td>{el.date}</td>
            <td>{el.wpm}</td>
            <td>{el.accuracy}</td>
            <td>{el.duration}</td>
            <td>{el['text-sample']}</td>
        </tr>
    ))}
  </table>


    </div>
  )
}

export default UserTestHistory