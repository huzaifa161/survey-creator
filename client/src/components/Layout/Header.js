import React, {  useContext } from 'react';
import styles from './Layout.module.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/user-context';
const Header = props => {
    const userAuth = useContext(AuthContext);


    const onLogout =async () => {
        try {
            await axios.get('/api/auth/sign-out');
            userAuth.clearAuth();
        } catch (err) {
            
        }
    }

    return (
        <div className={styles.Header}>
            <div className={styles.Logo}>Survey Creator</div>
            <div className={styles.Menu}>
                <Link className={styles.MenuItem} to='/survey/all-surveys'>Surveys</Link>        
                <Link className={styles.MenuItem} to='/survey/create-new-survey'>New Survey</Link>
            </div>
            {!userAuth.user.isAuthenticated ? (<Link to='/signin'> Login </Link>)
                :(
                    <div className={styles.LogoutContainer}>
                        <span className={styles.UserEmail}>{userAuth.user.user.email}</span>            
                        <button onClick={onLogout} className={styles.LogoutButton}>Log Out</button>
                    </div>
                )
            }
        </div>
    )
}

export default Header;