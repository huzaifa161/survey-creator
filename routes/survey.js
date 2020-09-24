const express = require('express');

const router = express.Router();

const { createSurvey, getAllSurveys, submitSurvey,
    getSurvey, createNewQuestion, getQuestion, getCurrentUserSurveys,updateSurvey } = require('../controllers/Survey');
const { requireAuth } = require('../controllers/auth');


router.post('/create-survey', requireAuth, createSurvey);

router.get('/all-surveys', getAllSurveys);
router.get('/my-surveys', requireAuth, getCurrentUserSurveys);
router.get('/:id',requireAuth, getSurvey);


router.post('/create-new-question', requireAuth, createNewQuestion);

router.get('/question/:qId', requireAuth, getQuestion);


router.post('/submit-survey', requireAuth, submitSurvey);
router.put('/update/:id', requireAuth, updateSurvey);
module.exports = router;