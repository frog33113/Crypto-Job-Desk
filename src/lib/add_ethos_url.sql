-- Add ethos_profile_url to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS ethos_profile_url TEXT;
