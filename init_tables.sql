CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  user_name TEXT,
  bank_account VARCHAR,
  user_address TEXT,
  email TEXT,
  phone INTEGER
);