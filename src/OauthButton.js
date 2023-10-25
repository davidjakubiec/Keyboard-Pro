// OAuthButton.js
import React from 'react';


const OAuthButton = () => {


  const handleLoginClick = () => {
    // Redirect the user to the OAuth provider's authentication endpoint
    window.location.href = 'http://localhost:3000/auth/google'; // Assuming '/auth/google' is your OAuth route
  };

  const handleLogoutClick = () => {
    // Redirect the user to the OAuth provider's authentication endpoint
    window.location.href = 'http://localhost:3000/auth/logout'; // Assuming '/auth/google' is your OAuth route
  };

  return (
    <div>
      <button onClick={handleLoginClick}>Login with Google</button>
      <button onClick={handleLogoutClick}>Log out</button>
    </div>
    
  );
};

export default OAuthButton;