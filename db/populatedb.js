const { Client } = require('pg');
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id  INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR( 255 ),
    last_name VARCHAR( 255 ),
    email VARCHAR( 255 ),
    password VARCHAR( 255 ),
    membership_status BOOLEAN,
    admin BOOLEAN
);

CREATE TABLE IF NOT EXISTS content (
    id  INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR( 255 ),
    timestamp TIMESTAMP,
    text VARCHAR( 255 ),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
`;

async function main() {
  console.log('sending...');
  const client = new Client({
    connectionString: process.env.DB_URL,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log('done');
}

main();
