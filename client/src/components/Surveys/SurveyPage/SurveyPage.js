import React, { useState, useEffect, useContext } from 'react';
import styles from './SurveyPage.module.css';
import axios from 'axios';

import Layout from '../../Layout/Layout';

import userContext from '../../../context/user-context';
import { setSurveyAnswers } from '../../Helpers';
import { submitSurveyValidator } from '../../../validation';
import { Link } from 'react-router-dom';
const SurveyPage = props => {
    const userAuth = useContext(userContext);
  
  const [survey, setSurvey] = useState(null);
  const [errors, setErrors] = useState({});
    const fetchSurvey = async () => {
        const { id } = props.match.params;
        try {
          let { data } = await axios.get(`/api/survey/${id}`);
          const questions = data.questions.map(question => {
            return { ...question, options: question.options.map(option => ({ ...option, votes: [] })) };
          });
          data = { ...data, questions };
          setSurvey(data);

        } catch (err) {
            console.log(err);
        }

    }

    const handleChange = (e, quesIndex, index) => {
        const { type, value, checked } = e.target;    
        const data = setSurveyAnswers(survey, type, value, quesIndex, index, userAuth.user.user._id, checked);
        setSurvey(prev => ({ ...prev, ...data }));   
    }


  const onSubmit = async e => {
    e.preventDefault();

    const [valid, errors] = submitSurveyValidator(survey);
    if (!valid) return setErrors(errors);
    
    setErrors({});
    
    try {
      const result = await axios.post('/api/survey/submit-survey', {questions: survey.questions });
    } catch (error) {
      console.log(error);
    }

  }
  const publishSurvey = async e => {
    try {
      const result = await axios.put(`/api/survey/update/${survey._id}`, { ...survey, published: true });;
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
  
    useEffect(() => {
        fetchSurvey();
    }, []);


    if (!survey) return null;
    return (
      <Layout showSidebar={true}>
        <form onSubmit={onSubmit}>
          {Object.keys(survey).length && (
            <div>
              <div className={styles.SurveyContainer}>
                <p className={styles.SurveyTitle}>{survey.title}</p>
                <div className={styles.SurveyDescription}>
                  {survey.description}
                </div>
              </div>
              <div className={styles.QuestionContainer}>
                {survey.questions.length &&
                  survey.questions.map((question, quesIndex) => (
                    <div key={quesIndex} className={styles.Question}>
                      <p className={styles.QuestionQuestion}>
                        Q{quesIndex + 1} {question.question}
                      </p>
                      <div className={styles.SurveyQuestionOptionsContainer}>
                        {question.options &&
                          question.options.map((option, index) => (
                            <React.Fragment key={index}>
                              {question.type === "radio" ? (
                                      <div className={styles.SurveyQuestionOption}>
                                          <input id={option.value} onChange={(e) => handleChange(e, quesIndex, index)}
                                              type="radio" value={option.value.split(' ').join('').toLowerCase()} name='radio' />
                                          <label className={styles.SurveyQuestionOptionLabel} htmlFor={option.value}>
                                        {option.value}
                                    </label>
                                </div>
                              ) : (
                                <div className={styles.SurveyQuestionOption}>
                                              <input type="checkbox" onChange={(e) => handleChange(e, quesIndex, index)}
                                                  value={option.value.split(' ').join('').toLowerCase()} />
                                    <label className={styles.SurveyQuestionOptionLabel}>{option.value}</label>
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                      </div>
                    </div>
                  ))}
                {(!survey.published || userAuth.user._id == survey.createdBy._id) ? 
                  (
                    <div className={styles.ButtonGroup}>
                      <Link to={`/survey/${survey._id}/add-new-question`} className={[styles.Button,styles.AddNewQuestion].join(' ')}>Add New Question</Link>
                      <button onClick={publishSurvey} type='submit' className={[styles.Button,styles.PublishedSurvey].join(' ')}>Published Survey</button>
                    </div>
                  ) :
                  (<button type='submit' className={styles.SubmitSurvey}>Submit Survey</button>)

                 }
              
              </div>

            </div>
          )}
        </form>
      </Layout>
    );

};

export default SurveyPage;