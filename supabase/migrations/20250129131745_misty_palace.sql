/*
  # Fix Authentication Permissions for Status History View

  1. Changes
    - Create a security definer function to safely access auth.users
    - Recreate the view using the secure function
    - Set proper permissions and policies

  2. Security
    - Use security definer function to safely access auth.users
    - Maintain RLS policies
    - Grant minimum required permissions
*/

-- First, drop the existing view
DROP VIEW IF EXISTS reservation_status_history_view;

-- Create a security definer function to safely get user email
CREATE OR REPLACE FUNCTION get_user_email(user_id uuid)
RETURNS text
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  user_email text;
BEGIN
  SELECT email INTO user_email
  FROM auth.users
  WHERE id = user_id;
  RETURN user_email;
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_user_email TO authenticated;

-- Recreate the view using the secure function
CREATE VIEW reservation_status_history_view
WITH (security_invoker = true)
AS
SELECT
  h.id,
  h.reservation_id,
  h.previous_status,
  h.new_status,
  h.changed_at,
  h.table_number,
  h.reason,
  get_user_email(h.changed_by) as changed_by_email
FROM
  reservation_status_history h;

-- Grant appropriate permissions
GRANT SELECT ON reservation_status_history_view TO authenticated;

-- Create policy for the view
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'reservation_status_history_view'
  ) THEN
    CREATE POLICY "Les administrateurs peuvent voir la vue d'historique"
      ON reservation_status_history_view
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;