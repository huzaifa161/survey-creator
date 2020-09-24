const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const QuestionSchema = new mongoose.Schema({
    question: {
        type:String,
        required: true
    },
    isRequired: {
        type: Boolean,
        default: false
    },
    options: [{
        value: {
            type: String,
            required: true
        },
        votes: [{
            type: ObjectId,
            ref:'User'
        }]
    }],
    type: {
        type: String,
        required: true
    },
    survey: {
        type: ObjectId,
        ref:'Survey'
    },
    createdBy: {
        type: ObjectId,
        ref:'User'
    }
});


module.exports = mongoose.model('Question', QuestionSchema);