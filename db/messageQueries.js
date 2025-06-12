const pool = require('./pool');

const insertMessage = async (userId, title, msg) => {
  await pool.query(
    'INSERT INTO content (title, timestamp, text, user_id) VALUES ($1, NOW(), $2, $3)',
    [title, msg, userId]
  );
};

const getAllMessages = async () => {
  const { rows } =
    await pool.query(`SELECT content.id AS "msgID", first_name, last_name, title, timestamp, text
                            FROM content JOIN users ON content.user_id = users.id 
                            ORDER BY timestamp DESC`);
  return rows;
};

module.exports = { insertMessage, getAllMessages };
