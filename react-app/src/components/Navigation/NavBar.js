import React from 'react';
import { useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import SearchBar from './SearchBar';
import logo from '../images/Logo.png';
import "./NavBar.css"

const NavBar = () => {
    const user = useSelector(state => state.session.user)
    console.log(user)
    const CapLetter = user?.username[0].toUpperCase()
  return (
    <nav>
        <div className='navBar-main'>
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
                                <img className='navbar-no-profileimg'src={user.profileImage} alt='img'></img>
                            :
                                <div className='navbar-no-profileimg'>{CapLetter}</div>
                            }
                        </div>
                        <div className='navbar-logout'>
                            <LogoutButton />
                        </div>
                    </>
                    :
                    <>
                        <div className='navbar-login'>
                        <NavLink to='/login' exact={true} activeClassName='active'>
                            Login
                        </NavLink>
                        </div>
                        <div className='navbar-signup'>
                        <NavLink to='/sign-up' exact={true} activeClassName='active'>
                            Sign Up
                        </NavLink>
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
    </nav>
  );
}

export default NavBar;
