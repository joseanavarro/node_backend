/* Load modules */

let Client = require('../model/client');
let Policy = require('../model/policy');

var client = require('../modules/client.js')


/**
 * Authorization module
 */
exports.authenticate = function (username, password, done) {

    // Chehck that usernane and password are the same
    if (username === password) {
        // Check if user exists in clients database and check the role required
        var item = client.findClientName(username);
        if (item === undefined) {
            return done(null, null);
        } else {
            // Any existing user is authenticated
            return done(null, username);
        }
    } else {
        return done(null, null);
    }

};


exports.authorize = function (username) {

    // Check if user exists in clients database and check the role required
    var item = client.findClientName(username);
    if (item === undefined) {
        return false;
    } else {
        // Required role is admin, only admin users are athorized
        if (item.role === 'admin') {
            return true;
        } else {
            return false;
        }
    }


};