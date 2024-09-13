const Model = require('../model');
const pool = require('../db');

class User extends Model {
    constructor() {
        super('users');
        this.db = pool;
    }

    async findByEmail(email) {
        return await super.findByEmail(email);
    }
}

module.exports = User;
