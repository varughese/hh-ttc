var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    path = require('path'),
    port = process.env.PORT || 3000;

var User = require('./app/models/user');

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

apiRouter.use(function(req, res, next) {
    console.log('Someone just came to our app!');
    next();
});

apiRouter.get('/', function(req, res) {
    res.json({ message: 'sup bruh'});
});

apiRouter.route('/users')
    .post(function(req, res) {
        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;

        user.save(function(err) {
            if(err) {
                if(err.code == 11000)
                    return res.json({success: false, message: 'username already exists'});
                else
                    return res.send(err);
            }
            res.json({message: 'User Created!'});
        });
    })
    .get(function(req, res) {
        User.find(function(err, users) {
            if(err) res.send(err);

            res.json(users);
        });
    })
    ;


app.use('/api', apiRouter);

app.listen(port);
console.log('Magic happening on port', port);
