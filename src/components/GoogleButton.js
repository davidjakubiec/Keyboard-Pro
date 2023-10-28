import React, { useState, useContext, useEffect } from 'react'
import icon from '../../assets/OAuthButtons/Google/Web (mobile + desktop)/png@3x/neutral/web_neutral_sq_SU@3x.png'
import { Context } from '../App'


const GoogleButton = () => {


    const handleLogoutClick = () => {
      // Redirect the user to the OAuth provider's authentication endpoint
      window.location.href = 'http://localhost:3000/auth/logout'; // Assuming '/auth/google' is your OAuth route
    };

    const handleLoginClick = () => {
        // Redirect the user to the OAuth provider's authentication endpoint
        window.location.href = 'http://localhost:3000/auth/google'; // Assuming '/auth/google' is your OAuth route
      };

  return (
    <div> 
    <button onClick={handleLoginClick} className='google-button'>
        <img src={icon} alt="SVG Icon" width='200px'/>
    </button>
    <button onClick={handleLogoutClick}>Log out</button>
    </div>
  )
}

export default GoogleButton
