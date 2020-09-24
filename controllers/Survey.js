const { createSurveyValidator, createQuestionValidator } = require('../validation/index');
const Survey = require('../models/Survey');
const Question = require('../models/Question');

const User = require('../models/User');
const { options } = require('../routes/survey');

exports.createSurvey = async (req, res) => {

    req.body.createdBy = req.user._id; 
    const [valid, errors] = createSurveyValidator(req.body);
    if (!valid) return res.status(400).json({errors});

    try {
        const survey = new Survey(req.body);
        await survey.save();
        res.json({ msg: 'Success' });
    } catch (err) {
        return res.status(400).json({ error: 'Something went wrong' });
    }
}

exports.createQuestion = async (req, res) => {
    const [valid, errors] = createQuestionValidator(req.body);
    if (!valid) return res.status(400).json({errors});

    try {
        const survey = await Survey.findById(req.body.survey);

        if (!survey) return res.status(400).json({ error: 'Survey not Found' });
        if (survey.createdBy !== req.body.createdBy) return res.status(401).json({ error: 'Unauthorized' });
        
        const question = new Question(req.body);
        const result = await question.save();

        survey.questions.push(result._id);

        await survey.save();

        res.json(result);
        
    } catch (err) {
        return res.status(400).json({ error: 'Something went wrong' });
    }
}

exports.getAllSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find({ published:true}).populate('createdBy','name _id ').exec();
        res.json(surveys)
    } catch (error) {
        return res.status(400).json({ error: 'Something went wrong' });
    }
}

exports.getSurvey = async (req, res) => {
    const { id } = req.params;
    try {
        const survey = await Survey.findById(id).populate('createdBy', '_id name').populate('questions').exec();
        if ((survey.createdBy._id.toString() === req.user._id.toString()) || survey.published) {
             return res.json(survey);
        }
        return res.status(401).json('Unauthorized')

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Sometihng went wrong" });
        
    }
}

exports.createNewQuestion = async (req, res) => {

    try {
         
        const survey = await Survey.findById(req.body.survey);

        if (!survey) return res.status(400).json({ error: 'Survey not Found' });
 
        req.body.createdBy = req.user._id;
        req.body.survey = survey._id;
         
        const [valid, errors] = createQuestionValidator(req.body);
        if (!valid) return res.status(400).json({errors});

   
        if (survey.createdBy.toString() !== req.user._id.toString()) return res.status(401).json({ error: 'Unauthorized' });
        
        const question = new Question(req.body);
        const result = await question.save();

        survey.questions.push(result._id);

        const updatedSurvey = await survey.save();

        res.json(updatedSurvey);
        
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

exports.getQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.qId);
        if (!question) return res.status(400).json({ error: 'Question Not Found' });

        res.json(question);
    } catch (err) {
        return res.status(400).json({ error: 'Something went Wrong' });
    }

}

exports.submitSurvey = async (req, res) => {
    const { questions } = req.body;
    try {
        questions.forEach(async (quest, i) => {
            const question = await Question.findById(quest._id);
            question.options.forEach((option, idx) => {
                if (questions[i].options[idx].votes.lenght) {
                    const [vote] = questions[i].options[idx].votes;
                    option.votes.push(vote)
                }
            });
            await question.save();
        });
        res.json({ msg: 'ok' });
    
    } catch (error) {
        console.log(error)        
    }
}

exports.getCurrentUserSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find({createdBy: req.user._id});
        res.json(surveys);
    } catch (err) {
        res.status(400).json({ error: 'Something went Wrong' });
    }
}




exports.updateSurvey = async  (req, res) => {
    try {
        const { id } = req.params;
        const result = await Survey.findByIdAndUpdate({ _id: id }, req.body, { useFindAndModify: false });
        res.json({ msg: 'Success' });
    } catch (err) {
        console.log(err);
    }

}