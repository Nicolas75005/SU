/*
  # Create initial admin user with proper authentication

  1. Changes
    - Creates the initial admin user with email admin@su-paris.fr
    - Sets up necessary role and permissions
  
  2. Security
    - Password is properly hashed using Supabase Auth
    - User will be created with admin role
*/

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the admin user
DO $$
DECLARE
  new_user_id UUID;
BEGIN
  -- Insert into auth.users
  INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    aud,
    role
  ) VALUES (
    uuid_generate_v4(),
    'admin@su-paris.fr',
    crypt('admin123', gen_salt('bf')),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{"role": "admin"}',
    'authenticated',
    'authenticated'
  )
  RETURNING id INTO new_user_id;

  -- Insert into auth.identities
  INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  ) VALUES (
    new_user_id,
    new_user_id,
    format('{"sub":"%s","email":"%s"}', new_user_id::text, 'admin@su-paris.fr')::jsonb,
    'email',
    NOW(),
    NOW(),
    NOW()
  );

  -- Insert into admin_profiles
  INSERT INTO public.admin_profiles (id, email)
  VALUES (new_user_id, 'admin@su-paris.fr');
END $$;