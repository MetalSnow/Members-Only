const Database = require('./orm');

class User extends Database {
  async insertUser(data) {
    await this.insert('users', data);
  }
  async assignMembership(id) {
    await this.update('users', 'membership_status', true, { id: id });
  }
  async findUserByEmail(email) {
    const rows = await this.select('users', '*', { email: email });
    return rows[0];
  }
  async findUserById(id) {
    const rows = await this.select('users', '*', { id: id });
    return rows[0];
  }
  async assignAdmin(id) {
    await this.update('users', 'admin', true, { id: id });
  }
  async getAllAdmins() {
    const rows = await this.select('users', '*', { admin: true });
    return rows;
  }
}

const userService = new User();

module.exports = {
  userService,
};
