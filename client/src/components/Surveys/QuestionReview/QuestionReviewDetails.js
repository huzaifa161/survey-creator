import React from 'react';
import styles from './QuestionReview.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
const QuestionReviewDetails = ({ surId,ques, index  }) => {
    console.log(ques)
    return (
        <div className={styles.QuestionReviewDetails}>
            <div className={styles.QuestionReviewDetailsBar}>
                <p className={styles.QuestionReviewQuestion}>
                    
                    <span className={null}>Q{index +1} {ques.question}</span>
                </p>
                <div className={styles.QuestionReviewOption}>
                    {ques.options.map((option, index) => (
                        <span key={index} className={styles.QuestionReviewOptionItem}>{option.value}</span>))}
                </div>
            </div>
            <div className={styles.QuestionReviewButtonGroup}>
                <Link to={`/survey/${surId}/question/${ques._id}/edit-question`} className={[styles.Button,styles.EditButton].join(' ')}>
                    <FontAwesomeIcon className={styles.Icon} icon={faEdit} /> </Link>
                <button className={[styles.Button, styles.DeleteButton].join(' ')}>
                    <FontAwesomeIcon className={ styles.Icon} icon={faTrash} /> 
                </button>
            </div>
        </div>
    )
}
export default QuestionReviewDetails;