-- Create a function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  name_value TEXT;
  avatar_url_value TEXT;
BEGIN
  -- Set name from metadata or use email as fallback
  name_value := NEW.raw_user_meta_data->>'name';
  IF name_value IS NULL THEN
    name_value := split_part(NEW.email, '@', 1);
  END IF;
  
  -- Set avatar URL if available (GitHub login)
  avatar_url_value := NEW.raw_user_meta_data->>'avatar_url';
  
  -- Insert into users table
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
    name_value,
    NEW.email,
    NEW.raw_user_meta_data->>'user_name',
    avatar_url_value,
    NEW.created_at,
    NEW.updated_at
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to automatically invoke the function
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Allow authenticated users to view projects" ON projects;
CREATE POLICY "Allow public to view projects"
ON projects FOR SELECT
USING (true);

CREATE POLICY "Allow authenticated users to insert projects"
ON projects FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update their own projects"
ON projects FOR UPDATE
TO authenticated
USING (auth.uid() = approved_freelancer); 