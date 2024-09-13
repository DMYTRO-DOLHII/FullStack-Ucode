const db = require('./db')

class Model {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async find(id) {
        const [rows] = await db.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
        return rows[0];
    }

    async create(fields, values) {
        const query = `INSERT INTO ${this.tableName} (${fields.join(", ")}) VALUES (${values.map(() => '?').join(", ")})`;
        const [result] = await db.query(query, values);
        return result;
    }
}

module.exports = Model;
