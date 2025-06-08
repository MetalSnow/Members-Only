const pool = require('./pool');
const asyncHandler = require('express-async-handler');

const insertUser = asyncHandler(async (user, password) => {
  await pool.query(
    'INSERT INTO users (first_name, last_name, email, password, membership_status) VALUES ($1, $2, $3, $4, $5)',
    [user.firstName, user.lastName, user.email, password, false]
  );
});

const assignMembership = asyncHandler(async (id) => {
  await pool.query('UPDATE users SET membership_status = true WHERE id = $1', [
    id,
  ]);
});
module.exports = { insertUser, assignMembership };
