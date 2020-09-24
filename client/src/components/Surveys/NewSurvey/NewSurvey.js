import React from 'react';
import SurveyForm from './SurveyForm'
import axios from 'axios'
const NewSurvey = () => {
    return <SurveyForm
    
        onSubmit={async survey => {
            const result = await axios.post('/api/survey/create-survey', survey);
        }}
    />
}

export default NewSurvey;