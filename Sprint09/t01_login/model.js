class Model {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async find(id) {
        const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
        const [rows] = await db.query(query, [id]);
        return rows[0];
    }

    async save(data) {
        let query;
        const keys = Object.keys(data).join(',');
        const values = Object.values(data).map(() => '?').join(',');

        if (data.id) {
            query = `UPDATE ${this.tableName} SET ${keys} = ${values} WHERE id = ?`;
            await db.query(query, Object.values(data));
        } else {
            query = `INSERT INTO ${this.tableName} (${keys}) VALUES (${values})`;
            await db.query(query, Object.values(data));
        }
    }
}

module.exports = Model;
