/* Load modules */
let Request = require('request');

let Client = require('../model/client');
let Policy = require('../model/policy');


/**
 * Small database
 */
class Config {

    constructor() {}

    init() {

        // Save in local files the remote data from:
        // http://www.mocky.io/v2/5808862710000087232b75ac -- clients
        // http://www.mocky.io/v2/580891a4100000e8242b75c5 -- policies

        // Request remote data for clients
        Request.get("http://www.mocky.io/v2/5808862710000087232b75ac", (error, response, body) => {
            if (error) {
                return console.dir(error);
            }
            let fs = require('fs');
            let file = './data/clients.json';
            fs.writeFile(file, body, function (err) {
                if (err) throw err;
                console.log('clients Saved!');
            });
        });

        // Request remote data for policies
        Request.get("http://www.mocky.io/v2/580891a4100000e8242b75c5", (error, response, body) => {
            if (error) {
                return console.dir(error);
            }
            let fs = require('fs');
            let file = './data/policies.json';
            fs.writeFile(file, body, function (err) {
                if (err) throw err;
                console.log('policies Saved!');
            });
        });

    };

}

module.exports = Config;