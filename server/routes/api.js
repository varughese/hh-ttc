var User = require('../models/user'),
    CommunityService = require('../models/service'),
    config = require('../../config'),
    jwt = require('jsonwebtoken');

module.exports = function(app, express) {
    var apiRouter = express.Router();

    apiRouter.get('/events', function(req, res) {
        CommunityService.find(function(err, events) {
            if(err) res.send(err);

            res.json(events);
        });
    });

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
                        id: user._id
                    }, config.secret, {
                        expiresIn: 60*24
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

    apiRouter.route('/users/:user_id')
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            res.json(user);
        });
    })
    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
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
            _id: req.params.user_id
        }, function(err, user) {
            if(err) return res.send(err);
            res.json({message: 'succesfully deleted'});
        });
    })
    ;

    apiRouter.param('user_id', function(req, res, next, id) {
        var query = User.findById(id);

        query.exec(function (err, user){
            if (err) { return next(err); }
            if (!user) { return next(new Error('can\'t find user')); }

            req.user = user;
            return next();
        });
    });

    apiRouter.route('/users/:user_id/events')
        .get(function(req, res) {
            req.user.populate('events', function(err, event) {
                if (err) return res.send(err);

                res.json(event);
            });
        })
        .post(function(req, res) {
            var vevent = new CommunityService();
            vevent.name = req.body.name;
            vevent.hours = req.body.hours;
            vevent.user = req.user;

            vevent.save(function(err, vevent) {
                if(err) return res.send(err);

                req.user.events.push(vevent);
                req.user.save(function(err, user) {
                    if(err) return res.send(err);
                    res.json(user);
                });
            });
        });

    apiRouter.route('/users/:user_id/events/:event_id')
        .put(function(req, res) {
            CommunityService.findById(req.params.event, function(err, event) {
                if(req.body.name) event.name = req.body.name;
                if(req.body.username) event.hours = req.body.hours;
                if(req.body.password) event.checked = req.body.checked;

                event.save(function(err) {
                    if(err) res.send(err);

                    res.json({message: 'Event updated'});
                });
            });
        })
        .delete(function(req, res) {
            CommunityService.remove({
                _id: req.params.event_id
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
