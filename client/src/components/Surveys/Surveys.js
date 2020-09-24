import React, { useState, useContext, useEffect } from 'react';
import Layout from '../Layout/Layout';
import SurveyItem from './SurveyItem';
import SurveyContext from '../../context/survey-context';
import axios from 'axios';
const Surveys = prop => {

    const [surveys, setSurveys] = useState([]);


    const fetchSurveys = async () => {
        try {
            const { data } = await axios.get('/api/survey/all-surveys');
            setSurveys(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSurveys();
    },[])
    return (
        <SurveyContext.Provider>
            <Layout showSidebar={true}>                
                <h2 className='heading__secondary'>All Surveys</h2>
                {surveys && surveys.map((survey, index) => (<SurveyItem survey={survey} key={index} />))}
            </Layout>
        </SurveyContext.Provider>
    )
} 

export default Surveys;