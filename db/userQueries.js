const pool = require('./pool');
const asyncHandler = require('express-async-handler');

const insertUser = async (user, password) => {
  await pool.query(
    'INSERT INTO users (first_name, last_name, email, password, membership_status) VALUES ($1, $2, $3, $4, $5)',
    [user.firstName, user.lastName, user.email, password, false]
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

module.exports = {
  insertUser,
  assignMembership,
  findUserByEmail,
  findUserById,
};
