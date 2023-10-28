const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tiemdTestResultsSchema = new Schema({
    id: String,
    date: Date,
    wpm: Number,
    accuracy: Number,
    duration: Number
})

const timedTestResults = mongoose.model('timed test result', tiemdTestResultsSchema);

module.exports = timedTestResults;