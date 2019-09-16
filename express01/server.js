const express = require('express');
const app = express();

/**
 * Models are responsible for creating and reading documents from the underlying MongoDB database. (https://mongoosejs.com/docs/models.html)
 * 
 * We have two models here, a generic Item that is queried by Id,
 * and RequestData used to persist time info about each request.
 */
const { Item, RequestData } = require('./models');

/**
 * https://github.com/expressjs/express/issues/3536
 * 
 * Setting and disabling json spaces per request was pointed out as a possible race.
 * 
 * json spaces -> it causes resulting JSON strings to be pretty-printed
 * 
 * track frequency and response time for a request
 * 
 * https://stackoverflow.com/questions/37035833/what-is-a-simple-way-of-counting-requests-that-the-sever-is-serving
 * https://solidgeargroup.com/express-logging-global-unique-request-identificator-nodejs
 * 
 */

let reqTimes = [];

setInterval(function interval() {
    reqTimes.forEach((r) => { (new RequestData(r)).save(); });
    reqTimes = [];
}, 5000);

app.use(function reqTime(req, res, next) {
    req.requestTime = { date: Date.now(), start: process.hrtime()[1] };
    next();
});

app.use(function pretty(req, res, next) {
    if (req.query['pretty'])
        app.set('json spaces', 2);
    else
        app.disable('json spaces');
    next();
});

app.get('/item/:iid', function get(req, res) {
    Item.findOne({ iid: req.params.iid })
        .then(function findone(item) {
            req.requestTime.end = process.hrtime()[1];
            reqTimes.push(req.requestTime);
            res.send(item);
        });
});

module.exports = app;