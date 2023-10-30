import React, { useEffect } from 'react'
import { Link } from "react-router-dom"



const NotFound = () => {
  useEffect(() => {
  window.location.href = 'https://davidjakubiec.github.io/Keyboard-Pro/'
},[])
  return (
    <div>
        {/* <h2>Page not found!</h2>
        <p>You're doing great!</p>

        <p>Go to the <Link to='/'>Homepage</Link></p> */}
    </div>
  )
}

export default NotFound