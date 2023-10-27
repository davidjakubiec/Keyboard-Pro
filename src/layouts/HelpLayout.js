import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

const HelpLayout = () => {
  return (
    <div className='help-layout'>

        <h2>Website Help</h2>
        <p>This is the page for the helping</p>

        <nav>
            <NavLink to='faq'>View to FAQ</NavLink>
            <NavLink to='contact'>Contact Us</NavLink>
        </nav>

        <Outlet />
    </div>
  )
}

export default HelpLayout