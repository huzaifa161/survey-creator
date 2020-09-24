const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const SurveySchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    description: String,
    active: {
        type: Boolean,
        default: true
    },
    published: {
        type: Boolean,
        default: false
    },
    questions: [{
        type: ObjectId,
        ref:'Question'
    }],
    createdAt: {
        type:Date,
        default:Date.now
    },
    updatedAt: Date,
    createdBy: {
        type: ObjectId,
        ref:'User'
    }
});


module.exports = mongoose.model('Survey', SurveySchema);