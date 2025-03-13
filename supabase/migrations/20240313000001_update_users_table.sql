-- Alter the users table to make github_id nullable and remove UNIQUE constraint
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_github_id_key;
ALTER TABLE users ALTER COLUMN github_id DROP NOT NULL; 