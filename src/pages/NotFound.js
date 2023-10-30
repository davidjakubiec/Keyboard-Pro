import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"



const NotFound = () => {
const [redirect, setRedirect] = useState(true);
const navigate = useNavigate();
  useEffect(() => {
    navigate('/')
    // if (redirect) {
    //   // window.location.href = 'https://davidjakubiec.github.io/Keyboard-Pro/'
    //   window.location.href = '/'
    //   setRedirect(false)
    // }
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