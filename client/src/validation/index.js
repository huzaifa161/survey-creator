const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const isValid = (errors) => {
    if (!(errors instanceof Object)) return;
    return [!Object.keys(errors).length, errors];
}

export const signInValidator = userCredentials => {
    const email = userCredentials.email ? userCredentials.email : '';
    const password = userCredentials.password ? userCredentials.password : '';

    const errors = {};
    if (!emailRe.test(email)) errors.email = 'Invalid Email';
    if (!email) errors.email = 'Email is required';

    if (!password) errors.password = 'Password is required';

    return isValid(errors);
}

export const signUpValidator = userCredentials => {
    const name = userCredentials.name ? userCredentials.name : '';
    const email = userCredentials.email ? userCredentials.email : '';
    const password = userCredentials.password ? userCredentials.password : '';
    const confirmPassword = userCredentials.confirmPassword ? userCredentials.confirmPassword : '';

    const errors = {};

    if (name.trim().length < 5) errors.name = 'Name must contain 5 Letters';
    if (!name) errors.name = 'Name is required';

    if (!emailRe.test(email)) errors.email = 'Invalid Email';
    if (!email) errors.email = 'Email is required';

    if (!password) errors.password = 'Password is required';

    if (confirmPassword !== password) errors.confirmPassword = 'Password must match';
    if (!confirmPassword) errors.confirmPassword = 'Confirm Password is required';

    return isValid(errors);
}


export const createSurveyValidator = survey => {
    const title = survey.title ? survey.title : '';
    const errors = {};

    if (!title) errors.title = 'Survey title is required';

    return isValid(errors);

}

export const createQuestionValidator = data => {

    const question = data.question ? data.question : '';
    const options = data.options.length ? data.options : [];
    const type = data.type ? data.type : '';
    const required = (data.required instanceof Boolean) ? data.required : false;

    const errors = {};

    if (!question) errors.question = 'Question is required';
    if (!options.length) errors.options = 'Options are required';
    if (!type) errors.type = 'Question type is required';

    return isValid(errors);
};


export const submitSurveyValidator = survey => {
    const questions = survey.questions;
    const errors = {};
    for (let i = 0; i < questions.length; i++){
        if (questions[i].isRequired && questions[i].options.every(option => !option.votes.length)) {
            errors[i] = 'required';
        }
    }
    return isValid(errors);
}