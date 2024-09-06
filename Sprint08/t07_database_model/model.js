const db = require('./db');

class Model {
    constructor(attributes = {}) {
        this.attributes = attributes;
    }

    async find(id) {
        const [rows] = await db.query(`SELECT * FROM ${this.constructor.table} WHERE id = ?`, [id]);
        if (rows.length > 0) {
            this.attributes = rows[0];
            return this;
        }
        throw new Error(`No record found with id ${id}`);
    }

    async delete() {
        if (!this.attributes.id) {
            throw new Error('Cannot delete a record without an ID.');
        }
        await db.query(`DELETE FROM ${this.constructor.table} WHERE id = ?`, [this.attributes.id]);
    }

    async save() {
        if (this.attributes.id) {
            // Update existing record
            const fields = Object.keys(this.attributes).filter(key => key !== 'id');
            const values = fields.map(key => this.attributes[key]);
            const placeholders = fields.map(field => `${field} = ?`).join(', ');
            await db.query(`UPDATE ${this.constructor.table} SET ${placeholders} WHERE id = ?`, [...values, this.attributes.id]);
        } else {
            // Insert new record
            const fields = Object.keys(this.attributes);
            const values = fields.map(key => this.attributes[key]);
            const placeholders = fields.map(() => '?').join(', ');
            const [result] = await db.query(`INSERT INTO ${this.constructor.table} (${fields.join(', ')}) VALUES (${placeholders})`, values);
            this.attributes.id = result.insertId;
        }
    }
}

module.exports = Model;
