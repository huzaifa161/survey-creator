import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../Layout/Layout';
import styles from '../../../styles/Form.module.css';
import altStyles from './NewQuestion.module.css';
import userContext from '../../../context/user-context';
import axios from 'axios';

import { createQuestionValidator } from '../../../validation/index';

const CreateSurvey = props => {
    const initialState = !props.question ? {} : props.question;

    const user = useContext(userContext);

    const [question, setQuestion] = useState(initialState.question || '');
    const [option, setOption] = useState('');
    const [options, setOptions] = useState(initialState.options || []); 
    const [required, setRequired] = useState(initialState.required || false);
    const [type, setType] = useState(initialState.type || null);
    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        switch (name) {
            case 'question':
                setQuestion(value);
                break;
            case 'option':
                setOption(value)
                break;
            case 'options':
                break;
            case 'required':
                setRequired(!required);
                break;
            case 'type':
                setType(value);
                break;
            default:
                break;
        }
    }
    
    const removeOption = index => {
        if (index !== 0 && !index) return;
        options.splice(index, 1);
        setOptions([...options]);
    }

    const clearInput = () => {
        setQuestion('');
        setRequired(false);
        setType(null);
        setOptions([]);
    }

    const addOption = () => {
        const newOptions = [...options, { value: option, votes: [] }];

        if (option.length && question.length) {
            setOptions(newOptions);
            setOption('');
        }

    }


    const onSubmit = async e => {
        e.preventDefault();
        
        const [isValid, errors] = createQuestionValidator({ question, options, required, type });
        if (!isValid) return setErrors(errors);        

        try {
            props.submit({ question, options, type, required });
            clearInput();
        } catch (err) {
            clearInput();
        }
        
    }


        const list = options.length > 0 ? options.map((option, index) => (
        <div  key={index} className={altStyles.SurveyReviewQuestionOption}>
            <div className={styles.options__items}>{option.value}</div>
            <div onClick={() => removeOption(index)} className={altStyles.SurveyReviewQuestionRemoveOption}>X</div> 
        </div>    
        )) : null;


    return (
        <Layout showSidebar={true}>
            <div className={styles.FormCenter}>
                <form onSubmit={onSubmit} className={[styles.Form, styles.FormLarge].join(' ')}>
                    <h3 className={styles.FormHeading}>Add New Question</h3>
                
                    <div className={styles.FormControl}> 
                    <input
                            type='text'
                            value={question}
                            onChange={handleChange}
                            placeholder='Enter your Question'
                            name='question'
                            id='question'
                            className={styles.FormInput}
                            autoComplete='off'
                        />
                        <label className={styles.FormLabel}>Question</label>
                        {errors.question && <div className={styles.FormError}>{errors.question}</div>}
                    </div>

                    <div className={[styles.FormControlRow].join(' ')}>
                        <div className={styles.FormControl}>
                            <input
                                type='text'
                                value={option}
                                onChange={handleChange}
                                placeholder='Option'
                                name='option'
                                id='option'
                                className={styles.FormInput}
                                autoComplete='off'
                            />
                            <label className={styles.FormLabel}>Option</label>
                            {errors.options && <div className={styles.FormError}>{errors.options}</div>}
                        </div>
                        <button type='button'
                            className={[styles.FormButton,styles.FormButtonSmall].join(' ')}
                            onClick={addOption} >Add Options
                        </button>
                   </div>

                    <div className={styles.FormControlRow}>
                        <div name='required' onClick={() => handleChange({ target: {name: 'required'}})} className={styles.FormDiv}>
                            <div className={[styles.FormDivItem, required ? styles.FormDivCheck: ''].join(' ')} onClick={null}>
                                Required
                            </div>
                        </div>
                        <div className={styles.FormDiv}>
                            <div className={[styles.FormDivItem, type==='radio' ? styles.FormDivCheck: ''].join(' ')} onClick={() => setType('radio')}>
                                Radio Options
                            </div>
                        </div>
                        <div className={styles.FormDiv}>
                            <div className={[styles.FormDivItem, type==='checkbox' ? styles.FormDivCheck: ''].join(' ')}  onClick={() => setType('checkbox')}>
                                Checkbox Options
                            </div>
                        </div>
                    </div>
                    {errors.type && <div className={styles.FormError}>{errors.type}</div>}
                    <div className={styles.FormControl}>
                        <button className={styles.FormButton}>Add Question </button>
                    </div>
                </form>
                <div className={altStyles.SurveyReview}>
                    <div className={styles.FormHeadingSecondary}>Question Review</div>
                    {question.length > 0 && <div className={altStyles.SurveyReviewQuestion}>Q) {question}</div>}
                    {list}
                </div>
            </div>
        </Layout>
    )
};

export default CreateSurvey