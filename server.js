var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    path = require('path'),
    port = process.env.PORT || 3000;

mongoose.connect('mongodb://varughese:Blackjack21@ds011745.mlab.com:11745/hhnhs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

app.use(morgan('dev'));

app.get('/', function(req, res) {
    res.send('Welcome to the home page!');
});

var apiRouter = express.Router();

apiRouter.get('/', function(req, res) {
    res.json({ message: 'sup bruh'});
});

app.use('/api', apiRouter);

app.listen(port);
console.log('Magic happening on port', port);
