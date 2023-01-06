import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import homepagePic from './images/bg-pic.png';
import Footer from './Navigation/Footer'
import './CSS/SplashPage.css'

const HomePage = () => {
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    const handleLoginClick = () => {
        history.push("/sign-up")
    }
    const handleAQClick = () => {
        history.push("/questions")
    }

    return (
        <>
        <div className='homepage-container'>
            {/* <img src={homepagePic} alt='homepagePic' className='homepage-pic'></img> */}
            <div className='homepage-button-container'>
                <div className='homepage-signup'>
                {user ?
                    <div className='homepage-signup-no-title'>Welcome to the Community</div>
                :
                    <button className='homepage-signup-title' onClick={handleLoginClick}>Join the community</button>
                }
                </div>
                <div className='homepage-allquestions'>
                    <button className='homepage-allquestions-title' onClick={handleAQClick}>Discover Questions</button>
                </div>
            </div>

            <div className='homepage-title-container'>
                <div className='homepage-title'>Every <span className='homepage-developer'>developer</span> has a tab open to Ztack Overflow</div>
            </div>
            <div className='homepage-sub-title-wrapper'>
                <div className='homepage-sub-title'>
                    <div className='homepage-sub-title-container'>
                        <div className='homepage-sub-title-top'>100+ million</div>
                        <div className='homepage-sub-title-bottom'>monthly visitors to Ztack Overflow & Ztack Exchange</div>
                    </div>
                </div>
                <div className='homepage-sub-title'>
                    <div className='homepage-sub-title-container'>
                        <div className='homepage-sub-title-top'>45.1+ billion</div>
                        <div className='homepage-sub-title-bottom'>Times a developer got help since 2008</div>
                    </div>
                </div>

                <div className='homepage-sub-title'>
                    <div className='homepage-sub-title-container'>
                        <div className='homepage-sub-title-top'>191% ROI</div>
                        <div className='homepage-sub-title-bottom'>from companies using Ztack Overflow for Teams</div>
                    </div>
                </div>
                <div className='homepage-sub-title'>
                    <div className='homepage-sub-title-container'>
                        <div className='homepage-sub-title-top'>5000+</div>
                        <div className='homepage-sub-title-bottom'>Ztack Overflow for Teams instances active every day</div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default HomePage
