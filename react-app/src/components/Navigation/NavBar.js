import React from 'react';
import { useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import SearchBar from './SearchBar';
import logo from '../images/Logo.png';
import "./NavBar.css"

const NavBar = () => {
    const user = useSelector(state => state.session.user)
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
                    <NavLink to='/' exact={true} activeClassName='active'>
                        <div className='navbar-logo'>
                            <img src={logo} alt="logo" className='logo'></img>
                        </div>
                    </NavLink>
                    </>
                }
            </div>
        </div>
        <div>
            <SearchBar/>
        </div>
        <div>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </div>
        <div>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
        <div>
          <LogoutButton />
        </div>
    </nav>
  );
}

export default NavBar;
