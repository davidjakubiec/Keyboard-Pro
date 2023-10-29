import { NavLink, Outlet } from 'react-router-dom'
import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import OAuthButton from '../OauthButton'
import GoogleButton from '../components/GoogleButton'

const RootLayout = () => {
  return (
    <div className='root-layout'>
        <header>
            <nav className='nav-bar'>
                {/* <NavLink className='nav-bar-link' to='/'>Time Test</NavLink> */}
                {/* <NavLink className='nav-bar-link' to='profile'>Profile</NavLink> */}
                {/* <NavLink className='nav-bar-link' to='help'>Help</NavLink>
                <NavLink className='nav-bar-link' to='careers'>Careers</NavLink> */}
                {/* <OAuthButton /> */}
                {/* <GoogleButton /> */}
            </nav>
            {/* <Breadcrumbs /> */}
        </header>

        <main>
            <Outlet />    
        </main>   
    </div>
  )
}

export default RootLayout