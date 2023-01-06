import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import logoPic from '../images/favicon.png'
import sidePic from '../images/signup.png'

import '../CSS/SignUp.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
        setErrors(["Password: Please confirm the Repeat Password"])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateUrl = (e) => {
    setUrl(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <div className='signup-wrapper'>
      <div className='signup-pic-container'>
        <img className='signup-pic' src={sidePic}></img>
      </div>
      <div className="signup-container">
      {/* <div>
          <img src={logoPic} alt='logoPic' className='logo-pic'></img>
      </div> */}

      <form onSubmit={onSignUp} className='signup-form'>
        <div>
          {errors.map((error, i) => (
            <div key={i} className='signup-error'>{error.split(":")[1]}</div>
          ))}
        </div>
        <div>
          <label className='signup-label'>Username</label>
          <br></br>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            className='signup-input'
          ></input>
        </div>
        <div>
          <label className='signup-label'>Email</label>
          <br></br>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            className='signup-input'
          ></input>
        </div>
        {/* <div>
          <label>ProfileImage</label>
          <input
            name='profile_image'
            onChange={updateUrl}
            value={url}
          ></input>
        </div> */}
        <div>
          <label className='signup-label'>Password</label>
          <br></br>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            className='signup-input'
          ></input>
        </div>
        <div>
          <label className='signup-label'>Repeat Password</label>
          <br></br>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            className='signup-input'
          ></input>
        </div>

        <button type='submit' className='signup-login-button'>Sign Up</button>
      </form>
        <div className='signup-sentence'>Already have an account?
          <Link style={{ textDecoration: "none", color: "blue" }} to={`/login`}> Log in</Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignUpForm;
