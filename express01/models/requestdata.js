const mongoose = require('mongoose');

const requestDataSchema = new mongoose.Schema({
    date: Number,
    start: Number,
    end: Number
});

const RequestData = mongoose.model('RequestData', requestDataSchema);

module.exports = RequestData