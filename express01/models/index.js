const mongoose = require('mongoose');

const Item = require('./item');
const RequestData = require('./requestdata');

const connectDb = () => {
  return mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = { connectDb, Item, RequestData }