/**
 * Client Entity (ES6 Class)
 */

class Client {
    constructor(id, name, email, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }
}

module.exports = Client;