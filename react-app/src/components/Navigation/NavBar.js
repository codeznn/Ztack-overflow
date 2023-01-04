import React from 'react';
import { useSelector} from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import SearchBar from './SearchBar';
import logo from '../images/Logo.png';
import "../CSS/NavBar.css"

const NavBar = () => {
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    //console.log(user)
    const CapLetter = user?.username[0].toUpperCase()

    const handleLoginClick = () => {
        return history.push('/login')
    }

    const handleSignupClick = () => {
        return history.push('/sign-up')
    }

  return (
    <nav>
        <div className='navBar-main'>
        <div className='navBar-outer'>
            <div className='navBar-link'>
                {user ?
                    <>
                    <NavLink to='/home' exact={true} activeClassName='active'>
                        <div className='navbar-logo'>
                            <img src={logo} alt="logo" className='logo'></img>
                        </div>
                    </NavLink>
                    </>
                    :
                    <>
                    <NavLink to='/questions' exact={true} activeClassName='active'>
                        <div className='navbar-logo'>
                            <img src={logo} alt="logo" className='logo'></img>
                        </div>
                    </NavLink>
                    </>
                }
            </div>

            <div className='navbar-search'>
                <SearchBar/>
            </div>

            <div className='navbar-right'>
                {user ?
                    <>
                        <div className='navbar-profileButtion'>
                            {user.profileImage ?
                                <img className='navbar-profileimg'src={user.profileImage} alt='img'></img>
                            :
                                <div className='navbar-no-profileimg'>
                                    <div className='navbar-no-profileimg-letter'>{CapLetter}</div>
                                </div>
                            }
                        </div>
                        <div className='navbar-logout'>
                            <LogoutButton />
                        </div>
                    </>
                    :
                    <>
                        <div className='navbar-login'>
                            <button type='button' onClick={handleLoginClick} className="login-button">Log in</button>
                        </div>
                        <div className='navbar-signup'>
                            <button type='button' onClick={handleSignupClick} className="signup-button">Sign up</button>
                        </div>
                    </>
                }


            </div>
        </div>



        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
        </div>
    </nav>
  );
}

export default NavBar;
