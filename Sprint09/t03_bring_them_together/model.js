const db = require('./db')

class Model {
    constructor(table) {
        this.table = table;
    }

    // Abstract method to find a record by id
    async findById(id) {
        const query = `SELECT * FROM ${this.table} WHERE id = ? LIMIT 1`;
        const [rows] = await db.query(query, [id]);
        if (rows.length) return rows[0];
        throw new Error(`${this.table.slice(0, -1)} not found.`);
    }

    // Save or update a record
    async save(data) {
        if (data.id) {
            const query = `UPDATE ${this.table} SET ? WHERE id = ?`;
            const [result] = await db.query(query, [data, data.id]);
            if (result.affectedRows) return true;
            throw new Error('Update failed.');
        } else {
            const query = `INSERT INTO ${this.table} SET ?`;
            const [result] = await db.query(query, [data]);
            if (result.insertId) return result.insertId;
            throw new Error('Insert failed.');
        }
    }

    // Delete a record by id
    async delete(id) {
        const query = `DELETE FROM ${this.table} WHERE id = ?`;
        const [result] = await db.query(query, [id]);
        if (result.affectedRows) return true;
        throw new Error('Delete failed.');
    }
}

module.exports = Model;
