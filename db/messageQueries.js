const pool = require('./pool');

const insertMessage = async (userId, title, msg) => {
  await pool.query(
    'INSERT INTO content (title, timestamp, text, user_id) VALUES ($1, NOW(), $2, $3)',
    [title, msg, userId]
  );
};

const getAllMessages = async () => {
  const { rows } =
    await pool.query(`SELECT content.id, first_name, last_name, title, timestamp, text
                            FROM content JOIN users ON content.user_id = users.id 
                            ORDER BY timestamp DESC`);
  return rows;
};

const removeMessage = async (id) => {
  await pool.query('DELETE FROM content WHERE id = $1', [id]);
};

module.exports = { insertMessage, getAllMessages, removeMessage };
