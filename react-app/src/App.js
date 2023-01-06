import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import AllQuestions from './components/AllQuestions/AllQuestions';
import TopQuestions from './components/AllQuestions/TopQuestions';
import HomePage from './components/SplashPage';
import SingleQuestion from './components/AllQuestions/SingleQuestion';
import CreateQuestion from './components/AllQuestions/CreateQuestion';
import EditQuestion from './components/AllQuestions/EditQuestion';
import EditAnswer from './components/Answer/editAnswer';
import SearchQuestions from './components/AllQuestions/SearchQuestions';
import PageNotFound from './components/PageNotFound';
import Profile from './components/Navigation/Profile';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/questions' exact={true}>
          <AllQuestions />
        </Route>
        <Route path='/questions/:questionId' exact={true}>
          <SingleQuestion />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/home' exact={true}>
          <TopQuestions />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/new-questions' exact={true}>
          <CreateQuestion />
        </Route>
        <Route path='/questions/:questionId/edit' exact={true}>
          <EditQuestion />
        </Route>
        <Route path='/profile' exact={true}>
          <Profile />
        </Route>
        {/* <Route path='/new-answer' exact={true}>
          <CreateQuestion />
        </Route> */}
        <Route path='/answers/:answerId/edit' exact={true}>
          <EditAnswer />
        </Route>
        <Route path='/search/:keyword' exact={true}>
          <SearchQuestions />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true}>
          <HomePage />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
