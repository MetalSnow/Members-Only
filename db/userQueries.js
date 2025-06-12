const pool = require('./pool');

const insertUser = async (user, password) => {
  await pool.query(
    'INSERT INTO users (first_name, last_name, email, password, membership_status, admin) VALUES ($1, $2, $3, $4, $5, $6)',
    [user.firstName, user.lastName, user.email, password, false, false]
  );
};

const assignMembership = async (id) => {
  await pool.query('UPDATE users SET membership_status = true WHERE id = $1', [
    id,
  ]);
};

const findUserByEmail = async (email) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);
  return rows[0];
};

const findUserById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0];
};

const assignAdmin = async (id) => {
  await pool.query('UPDATE users SET admin = true WHERE id = $1', [id]);
};

const getAllAdmins = async () => {
  const { rows } = await pool.query(
    'SELECT first_name, last_name FROM users WHERE admin = true'
  );
  return rows;
};

module.exports = {
  insertUser,
  assignMembership,
  findUserByEmail,
  findUserById,
  assignAdmin,
  getAllAdmins,
};
