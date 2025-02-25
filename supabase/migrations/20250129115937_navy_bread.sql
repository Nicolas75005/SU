/*
  # Authentication Setup

  1. Security
    - Enable email/password authentication
    - Set up RLS policies for admin access
    - Create admin_profiles table for additional user data

  2. Tables
    - admin_profiles
      - id (uuid, primary key, references auth.users)
      - email (text, unique)
      - created_at (timestamp)
      - last_login (timestamp)
*/

-- Create admin profiles table
CREATE TABLE IF NOT EXISTS admin_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Enable RLS
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admin profiles are viewable by authenticated admins only"
  ON admin_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Function to handle new admin user creation
CREATE OR REPLACE FUNCTION handle_new_admin_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.admin_profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new admin user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_admin_user();