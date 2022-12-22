import React from 'react';
import homepagePic from './images/homepage.png';
import './CSS/HomePage.css'

const HomePage = () => {
    return (
        <div className='homepage-container'>
            <img src={homepagePic} alt='homepagePic' className='homepage-pic'></img>
        </div>
    )
}

export default HomePage
