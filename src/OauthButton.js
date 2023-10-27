// OAuthButton.js

import React, { useContext } from 'react';
import { Context } from './App'

const OAuthButton = () => {
  const { user, setUser } = useContext(Context)


  const handleLoginClick = () => {
    // Redirect the user to the OAuth provider's authentication endpoint
    window.location.href = 'http://localhost:3000/auth/google'; // Assuming '/auth/google' is your OAuth route
    
  };

  const handleLogoutClick = () => {
    // Redirect the user to the OAuth provider's authentication endpoint
    window.location.href = 'http://localhost:3000/auth/logout'; // Assuming '/auth/google' is your OAuth route
  };

  const handleAuthCheckClick = () => {
    // Redirect the user to the OAuth provider's authentication endpoint
    fetch('http://localhost:3000/api/user')
      .then(data=>{
      console.log("api: ", data.body)
      setUser(data)
      })
      .catch(error=> console.error(error))
  };

  return (
    <div>
      <button onClick={handleLoginClick}>Login with Google</button>
      <button onClick={handleLogoutClick}>Log out</button>
      <button onClick={handleAuthCheckClick}>Auth Check</button>
      <div>user is: {JSON.stringify(user)}</div>
    </div>
    
  );
};

export default OAuthButton;