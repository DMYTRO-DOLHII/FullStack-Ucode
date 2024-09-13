const Model = require('../model');
const bcrypt = require('bcrypt');
const db = require('../db');

class User extends Model {
    constructor() {
        super('users');
    }

    async createUser({ login, password, full_name, email }) {
        return this.create(['login', 'password', 'full_name', 'email'], [login, password, full_name, email]);
    }

    async findUserByLogin(login) {
        const [rows] = await db.query(`SELECT * FROM users WHERE login = ?`, [login]);
        return rows[0];
    }

    async findUserByEmail(email) {
        const [rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
        return rows[0];
    }
}

module.exports = User;
