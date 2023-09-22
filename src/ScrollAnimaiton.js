import React, { useEffect } from 'react'
import './App.scss'
import AOS from 'aos'
import 'aos/dist/aos.css'; 

const ScrollAnimaiton = () => {
    useEffect(() => {
        AOS.init({duration: 2000});
    }, []);

  return (
    <div className='top'>
        <h1 className="text-center">Welcome to React animation</h1> <br/><br/><br/>
        <h1>Fade</h1>
        <div className='animation' data-aos="fade-up"></div>
        <div className='animation' data-aos="fade-down"></div>
        <div className='animation' data-aos="fade-right"></div>
        <div className='animation' data-aos="fade-left"></div>
        <h1>Flip</h1>
        <div className='animation' data-aos="flip-right"></div>
        <h1>Zoom Animation</h1>
        <div className='animation' data-aos="zoom-in"></div>
        <br/><br/><br/>

    </div>
  )
}

export default ScrollAnimaiton