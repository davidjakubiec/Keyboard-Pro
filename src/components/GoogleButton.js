import React from 'react'
import icon from '../../assets/OAuthButtons/Google/Web (mobile + desktop)/png@3x/neutral/web_neutral_sq_SU@3x.png'

const GoogleButton = () => {
    const handleLoginClick = () => {
        // Redirect the user to the OAuth provider's authentication endpoint
        window.location.href = 'http://localhost:3000/auth/google'; // Assuming '/auth/google' is your OAuth route
      };

  return (
    <button onClick={handleLoginClick} className='google-button'>
        <img src={icon} alt="SVG Icon" width='200px'/>
    </button>
    
  )
}

export default GoogleButton
