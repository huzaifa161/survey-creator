import React, { useState } from 'react';
import Layout from '../Layout/Layout';

import styles from '../../styles/Form.module.css';

import { signUpValidator } from '../../validation';

import axios from 'axios';
const SignIn = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [errors, setErrors] = useState({});

    const changeHandler = e => {
        const { name, value } = e.target;
        setErrors(prev => ({...prev, [name]: '' }));
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value)
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
            default:
                break;
        }
    }

    const clearInput = () => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const [valid, errors] = signUpValidator({ name, email, password, confirmPassword });
        if (!valid) return setErrors({ ...errors });
        const user = { name, email, password, confirmPassword };
        console.log(user);

        try {
            await axios.post('/api/auth/create-user', user);
            clearInput();
        } catch (err) {
            clearInput();
        }

    }
    return (
        <Layout showSidebar={false}>
        <div className={styles.FormCenter}>

            <form onSubmit={onSubmit} className={styles.Form}>
                <h2 className={styles.FormHeading}>Sign Up</h2>
                <div className={styles.FormControl}>
                    <input
                        name='name'
                        type='text'
                        value={name}
                        onChange={changeHandler}
                        placeholder='name'
                        className={styles.FormInput}
                        id='name'
                        autoComplete='off'
                    />
                    <label className={styles.FormLabel} htmlFor='name'>Name</label>
                    {errors.name && <span className={styles.FormError}>{errors.name}</span>}
                </div>
                <div className={styles.FormControl}>
                    <input
                        name='email'
                        type='text'
                        value={email}
                        onChange={changeHandler}
                        placeholder='email'
                        className={styles.FormInput}
                        id='email'
                        autoComplete = 'off'
                    />
                    <label className={styles.FormLabel} htmlFor='email'>Email</label>
                    {errors.email && <span className={styles.FormError}>{errors.email}</span>}
                </div>
                <div className={styles.FormControl}>
                    <input
                        name='password'
                        type='password'
                        value={password}
                        onChange={changeHandler}
                        placeholder='Password'
                        className={styles.FormInput}
                        id='password'
                        />
                    <label className={styles.FormLabel} htmlFor='password'>Password</label>
                    {errors.password && <span className={styles.FormError}>{errors.password}</span>}
                </div>
                                <div className={styles.FormControl}>
                    <input
                        name='confirmPassword'
                        type='password'
                        value={confirmPassword}
                        onChange={changeHandler}
                        placeholder='Confirm Password'
                        className={styles.FormInput}
                        id='confirmPassword'
                        />
                    <label className={styles.FormLabel} htmlFor='confirmPassword'>Confirm Password</label>
                    {errors.confirmPassword && <span className={styles.FormError}>{errors.confirmPassword}</span>}
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