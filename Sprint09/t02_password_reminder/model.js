class Model {
    constructor(table) {
        this.table = table;
    }

    async findByEmail(email) {
        const [rows] = await this.db.query(`SELECT * FROM ${this.table} WHERE email = ?`, [email]);
        return rows[0];
    }
}

module.exports = Model;
