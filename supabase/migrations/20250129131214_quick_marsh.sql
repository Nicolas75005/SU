/*
  # Fix Reservation Status History View

  1. Changes
    - Drop and recreate the view with correct SECURITY INVOKER syntax
    - Ensure proper dependencies and permissions

  2. Security
    - Maintain RLS policies
    - Set correct security context for the view
*/

-- Drop the existing view
DROP VIEW IF EXISTS reservation_status_history_view;

-- Recreate the view with SECURITY INVOKER in the CREATE VIEW statement
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
  u.email as changed_by_email
FROM
  reservation_status_history h
  LEFT JOIN auth.users u ON h.changed_by = u.id
ORDER BY
  h.changed_at DESC;

-- Grant appropriate permissions
GRANT SELECT ON reservation_status_history_view TO authenticated;

-- Create policy for the view if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_policies 
    WHERE tablename = 'reservation_status_history_view'
  ) THEN
    CREATE POLICY "Les administrateurs peuvent voir la vue d'historique"
      ON reservation_status_history_view
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;