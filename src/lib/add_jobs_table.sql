CREATE TABLE IF NOT EXISTS jobs (
  id SERIAL PRIMARY KEY,
  employer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT,
  requirements TEXT,
  salary_range TEXT,
  location TEXT,
  remote BOOLEAN DEFAULT TRUE,
  job_type TEXT DEFAULT 'full-time',
  created_at TIMESTAMP DEFAULT NOW()
);
