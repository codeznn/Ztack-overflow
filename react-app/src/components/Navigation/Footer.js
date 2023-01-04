import React from 'react';
import '../CSS/Footer.css'

const Footer = () => {
    return (
        <div className='footer-main-container'>
            <div className='footer-inner-container'>
                <div className='footer-icoin'><i className="fa-brands fa-github"></i></div>
                <div>
                    <a href='https://github.com/codeznn' className="social-link" target="_blank" style={{ textDecoration: 'none'}}> Nannan Zhang</a>
                </div>
            </div>
        </div>
    )
}

export default Footer
