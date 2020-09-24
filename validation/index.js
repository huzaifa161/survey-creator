const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const isValid = errors => {
    return [!Object.keys(errors).length, errors];
}


exports.signUpValidator = (user) => {
    const name = user.name ? user.name : '';
    const email = user.email ? user.email : '';
    const password = user.password ? user.password : '';

    const errors = {};

    if (name.trim().length < 5) errors.name = 'Name must contains atleast 5 letters';
    if (!name) errors.name = 'Name is required';

    if (!re.test(email)) errors.email = 'Email is Invalid';
    if (!email) errors.email = 'Email is required';

    if (!password) errors.password = 'Password is required';

    return isValid(errors);
}

exports.signInValidator = (user) => {
    const email = user.email ? user.email : '';
    const password = user.password ? user.password : '';

    const errors = {};

    if (!re.test(email)) errors.email = 'Email is Invalid';
    if (!email) errors.email = 'Email is required';

    if (!password) errors.password = 'Password is required';

    return isValid(errors);
}

exports.createSurveyValidator = (survey) => {
    const title = survey.title ? survey.title : '';
    const createdBy = survey.createdBy ? survey.createdBy : '';
    const errors = {};

    if (!title) errors.title = 'Survey title is required';
    if (!createdBy) errors.createdBy = 'Survey Author is required';

    return isValid(errors);
};

exports.createQuestionValidator = (surveyQuestion) => {

    const errors = {};

    const question = surveyQuestion.question ? surveyQuestion.question : '';
    const options = surveyQuestion.options instanceof Array ? surveyQuestion.options : [];
    const survey = surveyQuestion.survey ? surveyQuestion.survey : '';
    const createdBy = surveyQuestion.createdBy ? surveyQuestion.createdBy : '';

    if (!question) errors.question = 'Question is required';
    if (!options.length) errors.options = 'Options are required';
    if (!survey) errors.survey = 'Survey reference is required';
    if (!createdBy) errors.createdBy = 'Question author is required';
    
    return isValid(errors);
}