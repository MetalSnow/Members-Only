const pool = require('./pool');

module.exports = class Database {
  constructor() {
    this.pool = pool;
  }

  async query(sql, params = []) {
    return this.pool.query(sql, params);
  }

  async select(table, columns = '*', where = {}, orderby = null) {
    let sql = `SELECT ${columns} FROM ${table}`;
    const params = [];

    if (Object.keys(where).length > 0) {
      sql +=
        ' WHERE ' +
        Object.keys(where)
          .map((key, index) => {
            params.push(where[key]);
            return `${key} = $${index + 1}`;
          })
          .join(' AND ');
    }

    if (orderby) {
      sql += `ORDERBY ${orderby}`;
    }

    const { rows } = await this.query(sql, params);

    return rows;
  }

  async insert(table, data) {
    const columns = Object.keys(data).join(',');
    const placeHolders = Object.keys(data).map((key, index) => `$${index + 1}`);
    const values = Object.values(data);

    const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeHolders})`;

    return await this.query(sql, values);
  }

  async update(table, column, value, where = {}) {
    let sql = `UPDATE ${table} SET ${column} = ${value}`;
    const params = [];

    if (Object.keys(where).length > 0) {
      sql +=
        ' WHERE ' +
        Object.keys(where)
          .map((key, index) => {
            params.push(where[key]);
            return `${key} = $${index + 1}`;
          })
          .join(' AND ');
    }

    return await this.query(sql, params);
  }

  async delete(table, where = {}) {
    let sql = `DELETE FROM ${table}`;
    const params = [];

    if (Object.keys(where).length > 0) {
      sql +=
        ' WHERE ' +
        Object.keys(where)
          .map((key, index) => {
            params.push(where[key]);
            return `${key} = $${index + 1}`;
          })
          .join(' AND ');
    }

    return await this.query(sql, params);
  }
};
