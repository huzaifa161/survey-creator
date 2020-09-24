import React from 'react';
import QuestionForm from './QuestionForm';

import axios from 'axios';
const NewQuestion = props => {
    return (
        <QuestionForm {...props} submit={async (question) => {
            const { id } = props.match.params;
            question.survey = id;
            const result = await axios.post('/api/survey/create-new-question', question);
        }} />
    )
}

export default NewQuestion;