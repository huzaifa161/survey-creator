import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import userContext from '../../context/user-context';
import Spinner from '../Spinner/Spinner';

const ProtectedRoute = ({ Component, ...props}) => {

    const { user } = useContext(userContext);

    if (user.isAuthenticated === undefined) return <Spinner />;    
    return <Route {...props} render={(props) =>{
        
        return !user.isAuthenticated
            ? <Redirect to='/signin' />
            
            : <Component {...props} />}
     } />
}

export default ProtectedRoute;