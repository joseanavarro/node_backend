let Policy = require('../model/policy');

var fs = require('fs');

// Load Policies
function readPoliciessSync() {
    var file = './data/policies.json';
    if (fs.existsSync(file)) {
        var content = fs.readFileSync(file);
        var data = JSON.parse(content);
        return data;
    }
    return undefined;
}

// Load Clients
function readClientsSync() {
    var file = './data/clients.json';
    if (fs.existsSync(file)) {
        var content = fs.readFileSync(file);
        var data = JSON.parse(content);
        return data;
    }
    return undefined;
}

exports.findAllItems = function () {
    console.log('Returning all items');
    var data = readPoliciessSync();
    if (data) {
        var Policies = [];
        for (var index in data.policies) {
            let policy = new Policy(
                data.policies[index].id,
                data.policies[index].amountInsured,
                data.policies[index].email,
                data.policies[index].inceptionDate,
                data.policies[index].installmentPayment,
                data.policies[index].clientId);
            Policies.push(policy);
        }
        return Policies;
    }
    return [];
}

exports.findPoliciesByName = function (clientName) {
    console.log('Returning policies for client name: ' + clientName);
    var Clients = readClientsSync();
    if (Clients) {
        // First find the client identity
        let obj = Clients.clients.find(o => o.name === clientName);
        if (obj) {
            // Client name found, now find policies for that client id
            var clientId = obj.id;
            var data = readPoliciessSync();
            if (data) {
                var items = [];
                for (var index in data.policies) {
                    if (data.policies[index].clientId === clientId) {
                        items.push(data.policies[index]);
                    }
                }
                return items;
            } else {
                return undefined;
            }
        } else {
            // Client name not found
            return undefined;
        }
    }
    return undefined;
}

exports.findUserByPolicy = function (policyId) {
    console.log('Returning user by policy id: ' + policyId);

    var data = readPoliciessSync();
    if (data) {
        let obj = data.policies.find(o => o.id === policyId);
        // Policy id found, now find user for that policy id
        var clientId = obj.clientId;
        var Clients = readClientsSync();
        if (Clients) {
            let obj1 = Clients.clients.find(o => o.id === clientId);
            if (obj1) return obj1;
        } else {
            return undefined;
        }
    } else {
        // Policy id not found
        return undefined;
    }
    return undefined;
}