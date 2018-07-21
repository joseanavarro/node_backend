var express = require('express');
var client = require('../modules/client.js')
var auth = require('../modules/auth.js')
var router = express.Router();

// Autorization required role=user
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
passport.use(new BasicStrategy((username, password, done) => {
    return auth.authenticate(username, password, done);
}));

// Treat routes

router.get('/id/:clientId',
    passport.authenticate('basic', {
        session: false
    }),
    (request, response, next) => {
        var item = client.findClientId(request.params.clientId);
        if (item === undefined) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            response.end('Not found');
        } else {
            response.json(item);
        }
    });

router.get('/name/:clientName',
    passport.authenticate('basic', {
        session: false
    }),
    (request, response, next) => {
        var item = client.findClientName(request.params.clientName);
        if (item === undefined) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            response.end('Not found');
        } else {
            response.json(item);
        }
    });

module.exports = router;