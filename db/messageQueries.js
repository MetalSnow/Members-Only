const pool = require('./pool');

const insertMessage = async (userId, title, msg) => {
  await pool.query(
    'INSERT INTO content (title, timestamp, text, user_id) VALUES ($1, NOW(), $2, $3)',
    [title, msg, userId]
  );
};

module.exports = { insertMessage };
