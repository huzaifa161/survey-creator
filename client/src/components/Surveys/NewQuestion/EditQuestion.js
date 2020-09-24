import React, {useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';

import axios from 'axios';
const EditQuestion = props => {

    const [question, setQuestion] = useState(null);

    const fetchQuestion = async () => {
        try {
            const id = props.match.params.qId;
            const result = await axios.get(`/api/survey/question/${id}`);
            setQuestion(result.data);
        } catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        fetchQuestion();
    }, []);
    if (!question) return null;
    return (
        <QuestionForm question={question} {...props} submit={async (question) => {
            const { id } = props.match.params;
            question.survey = id;
            const result = await axios.post('/api/survey/create-new-question', question);
        }} />
    )
}

export default EditQuestion;