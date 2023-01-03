import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import '../CSS/Login.css'
import logoPic from '../images/favicon.png'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const DemoUser = (e) => {
    e.preventDefault();
    setErrors([]);
    const demoEmail = "demo@gmail.com";
    const demoPassword = "demo_user";
    return dispatch(login(demoEmail, demoPassword)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <div className='login-wrapper'>

      <div className="login-container">
        <div>
          <img src={logoPic} alt='logoPic' className='logo-pic'></img>
        </div>
        <form onSubmit={onLogin} className='login-form'>
          <div className='login-error'>
            {errors.map((error, i) => (
              <div key={i} >{error.split(":")[1]}</div>
            ))}
          </div>
          <div>
            <label htmlFor='email' className='login-label'>Email</label>
            <br></br>
            <input
              name='email'
              type='text'
              value={email}
              onChange={updateEmail}
              required
              className='login-input'
            />
          </div>
          <div>
            <label htmlFor='password' className='login-label'>Password</label>
            <br></br>
            <input
              name='password'
              type='password'
              value={password}
              onChange={updatePassword}
              required
              className='login-input'
            />
          </div>
          <button type='submit' className='login-login-button'>Login</button>
          <button onClick={DemoUser} className='login-demo-button'>Demo User</button>
        </form>
        <div className='login-sentence'>Don’t have an account?
          <Link style={{ textDecoration: "none", color: "blue" }} to={`/sign-up`}> Sign up</Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginForm;
