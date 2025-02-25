/*
  # Create initial admin user

  1. Changes
    - Creates the initial admin user with email admin@su-paris.fr
    - Sets up necessary role and permissions
  
  2. Security
    - Password is handled by Supabase Auth
    - User will be created with admin role
*/

-- Create the admin user using Supabase's auth.users table
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@su-paris.fr',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Ensure the user is added to admin_profiles
INSERT INTO public.admin_profiles (
  id,
  email
)
SELECT id, email
FROM auth.users
WHERE email = 'admin@su-paris.fr'
ON CONFLICT (email) DO NOTHING;