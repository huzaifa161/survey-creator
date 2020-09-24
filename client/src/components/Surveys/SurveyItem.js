import React from 'react';
import styles from './Survey.module.css';
import { Link } from 'react-router-dom';
const SurveyItem = ({ survey }) => {
    console.log(survey);
    return (
        <div className={styles.SurveyItem}>
            <div className={styles.SurveyItemTitleBar}>
                <div className={styles.SurveyItemTitle}>{survey.title}</div>
            </div>
            <div className={styles.SurveyItemDescBar}>
                <div className={styles.SurveyItemDesc}>{survey.description}</div>
                <Link to={`/survey/answer-to-survey-questions/${survey._id}`} className = {styles.SurveyButton}>Go to Survey</Link>
            </div>
        </div>
    )
}

export default SurveyItem;