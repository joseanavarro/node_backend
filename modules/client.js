let Client = require('../model/client');

var fs = require('fs');

function readClientsSync() {
    var file = './data/clients.json';
    if (fs.existsSync(file)) {
        var content = fs.readFileSync(file);
        var data = JSON.parse(content);
        return data;
    }
    return undefined;
}
exports.findItems = function (roleId) {
    console.log('Returning all items for id: ' + roleId);
    var data = readClientsSync();
    if (data) {
        var items = [];
        for (var index in data.clients) {
            if (data.clients[index].role === roleId) {
                var category = catalog.catalog[index];
                for (var itemIndex in category.items) {
                    items.push(category.items[itemIndex]);
                }
            }
        }
        return items;
    }
    return undefined;
}
exports.findAllItems = function () {
    console.log('Returning all items');
    var data = readClientsSync();
    if (data) {
        var Clients = [];
        for (var index in data.clients) {
            let client = new Client(data.clients[index].id, data.clients[index].name, data.clients[index].email, data.clients[index].role);
            Clients.push(client);
        }
        return Clients;
    }
    return [];
}
exports.findRole = function (roleId) {
    console.log('Returning all items for role: ' + roleId);
    var data = readClientsSync();
    if (data) {
        var items = [];
        for (var index in data.clients) {
            if (data.clients[index].role === roleId) {
                let cli = new Client(data.clients[index].id, data.clients[index].name, data.clients[index].email, data.clients[index].role);
                items.push(cli);
            }
        }
        return items;
    }
    return undefined;
}
exports.findClientId = function (clientId) {
    console.log('Returning item for client id: ' + clientId);
    var data = readClientsSync();
    if (data) {
        let obj = data.clients.find(o => o.id === clientId);
        if (obj) return obj;
    }
    return undefined;
}
exports.findClientName = function (clientName) {
    console.log('Returning item for client name: ' + clientName);
    var data = readClientsSync();
    if (data) {
        let obj = data.clients.find(o => o.name === clientName);
        if (obj) return obj;
    }
    return undefined;
}