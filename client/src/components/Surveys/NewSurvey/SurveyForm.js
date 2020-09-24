import React, { useState } from "react";
import Layout from '../../Layout/Layout';
import styles from '../../../styles/Form.module.css';
import { createSurveyValidator  } from '../../../validation';

const SurveyForm = props => {

    const [title, setTitle] = useState(props.title || '');
    const [description, setDescription] = useState(props.description || '');

    const [errors, setErrors] = useState(props.errors || {});
    const handleChange = e => {
        setErrors({});
        const { name, value } = e.target;
        name === 'title' ? setTitle(value) : setDescription(value);
    }

    const clearInput = () => {
        setTitle('');
        setDescription('');
        setErrors({});
    }
    const onSubmit = async e => {
        e.preventDefault();
        
        const [valid, errors] = createSurveyValidator({ title });
        console.log(errors)
        if (!valid) return setErrors(errors);

        try {
            await props.onSubmit({ title, description });
            clearInput();
        } catch (err) {
            setErrors({ error: 'Something went wrong' });
            clearInput();
        }
    }

    return (
        <Layout showSidebar={true} >
            <div className={styles.FormCenter}>
            <form onSubmit={onSubmit} className={styles.Form}>
                <h2 className={styles.FormHeading}>New Survey</h2>
                <div className={styles.FormControl}>
                    <input
                        type='text'
                        value={title}
                        onChange={handleChange}
                        placeholder='Survey Title'
                        name='title'
                        id='title'
                        className={styles.FormInput}
                        autoComplete='off'
                    />
                    <label className={styles.FormLabel} htmlFor='title'>Name</label>
                    {errors.title && <div className={styles.FormError}>{errors.title}</div>}
                </div>
                <div className={styles.FormControl}>
                    <textarea
                            value={description}
                            onChange={handleChange}
                            placeholder='Survey Description'
                            name='description'
                            id='description'
                            className={styles.FormTextarea}
                            autoComplete='off'>
                    </textarea>
                    <label className={styles.FormLabel} htmlFor='description'>Description</label>
                    {errors.name && <span className={styles.FormError}>{errors.name}</span>}
                </div>
                <div className={styles.FormControl}>
                    <button onClick={null} className={styles.FormButton}>Create Survey</button>
                </div>
                </form>
                </div>
        </Layout>
    )
}

export default SurveyForm;