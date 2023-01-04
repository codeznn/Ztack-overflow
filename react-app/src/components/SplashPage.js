import React from 'react';
import homepagePic from './images/homepage.png';
import Footer from './Navigation/Footer'
import './CSS/SplashPage.css'

const HomePage = () => {
    return (
        <>
        <div className='homepage-container'>
            <img src={homepagePic} alt='homepagePic' className='homepage-pic'></img>
        </div>
        <Footer />
        </>
    )
}

export default HomePage
