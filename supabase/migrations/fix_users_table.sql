-- Drop the UNIQUE constraint on github_id
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_github_id_key;

-- Make github_id nullable
ALTER TABLE users ALTER COLUMN github_id DROP NOT NULL;

-- Update the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  github_username TEXT;
  user_name TEXT;
  user_avatar TEXT;
BEGIN
  -- Get the provider from the user's identities
  IF EXISTS (
    SELECT 1 FROM jsonb_array_elements(NEW.identities) as identity
    WHERE identity->>'provider' = 'github'
  ) THEN
    -- GitHub signup
    github_username := NEW.raw_user_meta_data->>'user_name';
    user_name := COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'user_name', 'User');
    user_avatar := NEW.raw_user_meta_data->>'avatar_url';
  ELSE
    -- Email signup
    github_username := NULL;
    user_name := COALESCE(NEW.raw_user_meta_data->>'name', 'User');
    user_avatar := NULL;
  END IF;

  -- Insert the user with NULL values where appropriate
  INSERT INTO public.users (
    id,
    name,
    email,
    github_id,
    avatar_url,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    user_name,
    NEW.email,
    github_username,
    user_avatar,
    NEW.created_at,
    NEW.updated_at
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW; -- Still return NEW to allow the auth user to be created
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 