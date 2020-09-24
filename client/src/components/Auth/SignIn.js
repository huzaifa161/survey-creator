import React, { useState, useContext } from 'react';
import Layout from '../Layout/Layout';

import styles from '../../styles/Form.module.css';

import { signInValidator } from '../../validation';
import userContext from '../../context/user-context';
import axios from 'axios';
const SignIn = () => {
    const userAuth = useContext(userContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ });

    const changeHandler = e => {
        const { name, value } = e.target;
        setErrors(prev => ({...prev, [name]: '' }));
        switch (name) {
            case 'email':
                setEmail(value)
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    const onSubmit =async (e) => {
        e.preventDefault();
        const [valid, errors] = signInValidator({ email, password });
        if (!valid) return setErrors({ ...errors });

        try {
            const { data } = await axios.post('/api/auth/signin-user', { email, password });
            localStorage.setItem('token', JSON.stringify(data.token))
            userAuth.initAuth({ user: data.user, isAuthenticated: true });
        } catch (err) {
            
        }
    }
    return (
        <Layout showSidebar={false}>
            <div className={styles.FormCenter}>

            <form onSubmit={onSubmit} className={styles.Form}>
                <h2 className={styles.FormHeading}>Sign In</h2>
                <div className={styles.FormControl}>
                    <input
                        type='text'
                        name='email'
                        value={email}
                        onChange={changeHandler}
                        placeholder='email'
                        className={styles.FormInput}
                        id='email'
                        autoComplete='off'
                    />
                    <label className={styles.FormLabel} htmlFor='email'>Email</label>
                    {errors.email && <div className={styles.FormError}>{errors.email}</div>}
                </div>
                <div className={styles.FormControl}>
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={password}
                        onChange={changeHandler}
                        className={styles.FormInput}
                        id='password'
                        autoComplete='off'
                        />
                    <label className={styles.FormLabel} htmlFor='email'>Email</label>
                    {errors.password && <div className={styles.FormError}>{errors.password}</div>}
                </div>
                <div className={styles.FormControl}>
                    <button className={styles.FormButton} type='submit'>Sign In</button>
                </div>
                </form>    
            </div>    
        </Layout>
    )
}

export default SignIn;