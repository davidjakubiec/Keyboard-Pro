import React, { useState, useContext, useEffect } from 'react'
import icon from '../../assets/OAuthButtons/Google/Web (mobile + desktop)/png@3x/neutral/web_neutral_sq_SU@3x.png'
import { Context } from '../App'


const GoogleButton = () => {
    const { user, setUser } = useContext(Context);
    console.log("user variable", user)
    useEffect(() => {
        fetch('http://localhost:3000/api/user', {
            method: 'GET',
            credentials: 'include', 
          })
        .then((response) => response.json())
        .then((data) => setUser(data))

    },[])

    const handleLoginClick = () => {
        // Redirect the user to the OAuth provider's authentication endpoint
        window.location.href = 'http://localhost:3000/auth/google'; // Assuming '/auth/google' is your OAuth route
      };

  return (
    <div> {user ? user.username : <div></div>}
    <button onClick={handleLoginClick} className='google-button'>
        <img src={icon} alt="SVG Icon" width='200px'/>
    </button>
    </div>
  )
}

export default GoogleButton
