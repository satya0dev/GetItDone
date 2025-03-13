-- Make sure github_id is nullable
ALTER TABLE users ALTER COLUMN github_id DROP NOT NULL;

-- Make sure avatar_url is nullable
ALTER TABLE users ALTER COLUMN avatar_url DROP NOT NULL;

-- Add interested_projects array if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'interested_projects'
    ) THEN
        ALTER TABLE users ADD COLUMN interested_projects TEXT[] DEFAULT '{}';
    END IF;
END $$; 