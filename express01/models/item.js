const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    iid: Number,
    name: String
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item