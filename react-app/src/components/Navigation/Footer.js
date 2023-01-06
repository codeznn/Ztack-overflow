import React from 'react';
import '../CSS/Footer.css'

const Footer = () => {
    return (
        <div className='footer-main-container'>
            <div className="social-container">Created By <span className="my-name">Nannan Zhang</span>
                <a href='https://github.com/codeznn' className="social-link" target="_blank" rel="noreferrer" ><span><i className="fa-brands fa-github"></i></span></a>
                <a href='https://www.linkedin.com/in/nannan-zhang-2333b021b/' className="social-link" target="_blank" rel="noreferrer" ><span><i class="fa-brands fa-linkedin"></i></span></a>
            </div>
        </div>
    )
}

export default Footer
