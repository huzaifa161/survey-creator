import { createContext } from 'react';
export default createContext({
    surveys: [],
    addSurvey: () => { },
    removeSurvey: () => { },
    updateSurvey: () => { }
})