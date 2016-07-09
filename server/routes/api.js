var User = require('../models/user'),
    Event = require('../models/event'),
    config = require('../../config'),
    jwt = require('jsonwebtoken');

module.exports = function(app, express) {
    var apiRouter = express.Router();


    apiRouter.post('/token', function(req, res) {
        User.findOne({username: req.body.username})
        .select('name username password').exec(function(err, user) {
            if(err) throw err;

            if(!user) {
                res.json({
                    success: false,
                    message: 'Auth failed. User not found'
                });
            } else {
                var validPass = user.comparePassword(req.body.password);
                if(!validPass) {
                    res.json({
                        success: false,
                        message: 'Auth failed. Incorrect password'
                    });
                } else {
                    var token = jwt.sign({
                        name: user.name,
                        username: user.username,
                        id: user._id,
                        admin: user.admin
                    }, config.secret, {
                        expiresIn: 60*60*24
                    });

                    res.json({
                        success: true,
                        message: 'Enjoy!',
                        token: token
                    });
                }
            }
        });
    });

    apiRouter.use(function(req, res, next) {
        var token = req.body.token || req.params.token || req.headers['x-access-token'];

        if(token) {
            jwt.verify(token, config.secret, function(err, decoded) {
                if(err) {
                    return res.status(403).send({
                        success: false,
                        message: 'Failed to auth token'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided'
            });
        }
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
            if(req.body.admin) user.admin = true;

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

    apiRouter.route('/users/:userID')
        .get(function(req, res) {
            User.findById(req.params.userID, function(err, user) {
                res.json(user);
            });
        })
        .put(function(req, res) {
            User.findById(req.params.userID, function(err, user) {
                if(req.body.name) user.name = req.body.name;
                if(req.body.username) user.username = req.body.username;
                if(req.body.password) user.password = req.body.password;

                user.save(function(err) {
                    if(err) res.send(err);

                    res.json({message: 'User updated'});
                });
            });
        })
        .delete(function(req, res) {
            User.remove({
                _id: req.params.userID
            }, function(err, user) {
                if(err) return res.send(err);
                res.json({message: 'succesfully deleted'});
            });
        })
    ;

    apiRouter.param('userID', function(req, res, next, id) {
        var query = User.findById(id);

        query.exec(function (err, user){
            if (err) { return next(err); }
            if (!user) { return next(new Error('can\'t find user')); }

            req.user = user;
            return next();
        });
    });

    apiRouter.route('/users/:userID/events')
        .get(function(req, res) {
            req.user.populate('events', function(err, user) {
                if (err) return res.send(err);

                res.json(user.events);
            });
        })
        .post(function(req, res) {
            var event = new Event();
            event.name = req.body.name;
            event.date = new Date(req.body.date);
            event.hours = req.body.hours;
            event.user = req.user;

            event.save(function(err, event) {
                if(err) return res.send(err);

                req.user.events.push(event);
                req.user.save(function(err, user) {
                    if(err) return res.send(err);
                    res.json(user);
                });
            });
        });

    apiRouter.route('/users/:userID/events/:eventID')
        .get(function(req, res) {
            Event.findById(req.params.eventID, function(err, evt) {
                res.json(evt);
            });
        })
        .put(function(req, res) {
            Event.findById(req.params.eventID, function(err, event) {
                if(err) return res.send(err);

                if(req.body.name) event.name = req.body.name;
                if(req.body.hours) event.hours = req.body.hours;
                if(req.body.date) event.date = new Date(req.body.date);
                if(req.body.checked) event.checked = req.body.checked;

                event.save(function(err) {
                    if(err) res.send(err);

                    res.json({message: 'Event updated'});
                });
            });
        })
        .delete(function(req, res) {
            Event.remove({
                _id: req.params.eventID
            }, function(err, user) {
                if(err) return res.send(err);
                res.json({message: 'succesfully deleted'});
            });
        });

    apiRouter.get('/me', function(req, res) {
        res.send(req.decoded);
    });

    return apiRouter;
};
