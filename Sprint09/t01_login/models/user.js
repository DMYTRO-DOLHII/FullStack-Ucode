const Model = require('../model');
const db = require('../db');

class User extends Model {
    constructor() {
        super('users');
    }

    async findByLogin(login) {
        const query = `SELECT * FROM users WHERE login = ?`;
        const [rows] = await db.query(query, [login]);
        return rows[0];
    }
}

module.exports = User;
