CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  x_id TEXT UNIQUE NOT NULL,
  username TEXT,
  display_name TEXT,
  avatar_url TEXT,
  ethos_score INTEGER,
  ethos_verified TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS candidates (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  open_to_work BOOLEAN DEFAULT TRUE,
  role TEXT,
  skills TEXT,
  region TEXT,
  remote BOOLEAN DEFAULT TRUE,
  experience TEXT,
  bio TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);
