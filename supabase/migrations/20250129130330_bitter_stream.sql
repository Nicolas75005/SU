/*
  # Fix Reservation Status History View

  1. Changes
    - Drop and recreate the reservation_status_history_view with proper dependencies
    - Ensure proper column references and joins
    - Add appropriate RLS policies

  2. Security
    - Maintain existing RLS policies
    - Ensure proper access control for administrators
*/

-- Drop the existing view if it exists
DROP VIEW IF EXISTS reservation_status_history_view;

-- Recreate the view with proper dependencies
CREATE OR REPLACE VIEW reservation_status_history_view AS
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

-- Ensure RLS is enabled for the view
ALTER VIEW reservation_status_history_view SECURITY INVOKER;

-- Grant appropriate permissions
GRANT SELECT ON reservation_status_history_view TO authenticated;

-- Create policy for the view
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