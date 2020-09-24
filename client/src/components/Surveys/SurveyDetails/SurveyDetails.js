import React, { useEffect, useState }  from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import QuestionReviewDetails from '../QuestionReview/QuestionReviewDetails';

import styles from './SurveyDetails.module.css';
import SurveyForm from '../NewSurvey/SurveyForm';



const SurveyDetails = props => {
    const [survey, setSurvey] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    const fetchSurvey = async () => {
        const { id } = props.match.params;

        setIsLoading(true);
        try {
            const { data } = await axios.get(`/api/survey/${id}`);
            console.log(data)
            setSurvey(data);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);            
        }

    }
    useEffect(() => {
        fetchSurvey();
    }, [])
    
    if (isLoading) return <div>Loading</div>;
    if (!isLoading && !Object.keys(survey).length) return <div> Survey Not Found</div>;

    console.log(survey)
    return (
        <Layout showSidebar={true}>
            <div className={styles.SurveyDetails}>
                <div className={styles.SurveyTitle}>{survey.title}</div>
                <p className={styles.SurveyDescription}>{survey.description}</p>
                <Link className={styles.AddQuestionLink} to={`/survey/${survey._id}/add-new-question`} >Add Question</Link>
                {survey.questions.map((ques, index) => (<QuestionReviewDetails surId={survey._id} index={index} ques={ques} key={index} />))}
            </div>
        </Layout>
    )


}

export default SurveyDetails;