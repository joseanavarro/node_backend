var express = require('express');
var policy = require('../modules/policy.js')
var auth = require('../modules/auth.js')
var router = express.Router();

// Autorization required role=user
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
passport.use(new BasicStrategy((username, password, done) => {
    return auth.authenticate(username, password, done);
}));

// Treat routes

router.get('/',
    passport.authenticate('basic', {
        session: false
    }),
    (request, response, next) => {
        if (auth.authorize(request.user)) {
            var items = policy.findAllItems();
            response.json(items);
        } else {
            response.writeHead(403, {
                'Content-Type': 'text/plain'
            });
            response.end('Forbidden');
        };

    });

router.get('/name/:clientName',
    passport.authenticate('basic', {
        session: false
    }),
    (request, response, next) => {
        if (auth.authorize(request.user)) {
            var item = policy.findPoliciesByName(request.params.clientName);
            if (item === undefined) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                response.end('Not found');
            } else {
                response.json(item);
            }
        } else {
            response.writeHead(403, {
                'Content-Type': 'text/plain'
            });
            response.end('Forbidden');
        };
    });

router.get('/id/:policyId',
    passport.authenticate('basic', {
        session: false
    }),
    (request, response, next) => {
        if (auth.authorize(request.user)) {
            var item = policy.findUserByPolicy(request.params.policyId);
            if (item === undefined) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                response.end('Not found');
            } else {
                response.json(item);
            }
        } else {
            response.writeHead(403, {
                'Content-Type': 'text/plain'
            });
            response.end('Forbidden');
        };
    });

module.exports = router;