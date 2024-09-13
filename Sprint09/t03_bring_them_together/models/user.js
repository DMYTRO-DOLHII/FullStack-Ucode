const Model = require('../model');
const db = require('../db')

class User extends Model {
    constructor() {
        super('users'); // Assuming your table is called 'users'
    }

    async findByLogin(login) {
        const query = `SELECT * FROM ${this.table} WHERE login = ? LIMIT 1`;
        const [rows] = await db.query(query, [login]);
        if (rows.length) return rows[0];
    }

    async findByEmail(email) {
        const query = `SELECT * FROM ${this.table} WHERE email = ? LIMIT 1`;
        const [rows] = await db.query(query, [email]);
        if (rows.length) return rows[0];
    }

    // Create user
    async create(data) {
        const userData = {
            login: data.login,
            password: data.password,
            full_name: data.full_name,
            email: data.email
        };
        return await this.save(userData);
    }
}

module.exports = User;
