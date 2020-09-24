export const setSurveyAnswers = (survey, type, value, quesIndex, index, userId, checked) => {

    const surveyClone = { ...survey };
    let options = [...surveyClone.questions[quesIndex].options];

    if (type === 'radio') {
        
        options = options.map((option, index) => {

            if (option.value.split(' ').join('').toLowerCase() === value) {
                return { ...option, votes: filterArray(value, option.votes, userId) }
            } else {
                return { ...option, votes: [] }
            }
        });
   
    } else {
        options = options.map((option, index) => {
            if (checked && option.value.split(' ').join('').toLowerCase() === value) {
                return {
                    ...option,
                    votes: option.votes.indexOf(value) === - 1 ? [userId] : []
                }
                    
            } else if (!checked && option.value.split(' ').join('').toLowerCase() === value) {
                return {
                    ...option, votes: []
                }
                
            } else {
                return { ...option };
            }
        })
    }
    surveyClone.questions[quesIndex].options = options;
    return surveyClone;
    
}


const filterArray = (value, array, id) => {
    if (array.indexOf(value) === -1) {
        array.push(id);
    }
    return array;

 
}
