import React, { useState, useEffect } from 'react';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import SurveyPage from './components/Surveys/SurveyPage/SurveyPage';
import Surveys from './components/Surveys/Surveys';
import NewSurvey from './components/Surveys/NewSurvey/NewSurvey';
import NewQuestion from './components/Surveys/NewQuestion/NewQuestion';
import EditQuestion from './components/Surveys/NewQuestion/EditQuestion';


import { Switch, Route, withRouter, useHistory } from 'react-router-dom';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import SurveyDetails from './components/Surveys/SurveyDetails/SurveyDetails';
import userContext from './context/user-context';
import axios from 'axios';

import './App.css';
import './config/axios-config';
import MySurveys from './components/Surveys/MySurveys';

const App = props => {


  const initialState = { user: {}, isAuthenticated: undefined };

  const history = useHistory();

  const [user, setUser] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const initAuth = ({ user, isAuthenticated } ) => {
    const newUser = { user, isAuthenticated };
    setUser({...newUser });
  }

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      const results = await axios.post('/api/auth/check-sign-in');
      initAuth({ user: results.data, isAuthenticated: true });
      setIsLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        initAuth({ user: {}, isAuthenticated: false });
          setIsLoading(false)
      }
    }

  }
  const clearAuth = () => {
    setUser(prev => ({ ...initialState }));
    localStorage.removeItem('token');
    history.push('/');
  }

  useEffect(() => { 
    initializeAuth();
  }, []);

  return (
      <userContext.Provider value={{user, initAuth, clearAuth}}>
      <div className="App">
        <Switch>
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/survey/all-surveys' component={Surveys} />

          <ProtectedRoute path='/survey/my-surveys' Component={MySurveys} />
          <ProtectedRoute path='/survey/answer-to-survey-questions/:id' Component={SurveyPage} />
          <ProtectedRoute path='/survey/create-new-survey' Component={NewSurvey} />
          <ProtectedRoute path='/survey/:id/add-new-question' Component={NewQuestion} />
          <ProtectedRoute path='/survey/:id/question/:qId/edit-question' Component={EditQuestion} />
          <ProtectedRoute path='/survey/:id' Component={SurveyDetails} />
        </Switch>
        </div>
      </userContext.Provider>
  );
}

export default withRouter(App);
