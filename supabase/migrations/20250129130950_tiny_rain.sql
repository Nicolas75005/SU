/*
  # Fix Reservation Status History View

  1. Changes
    - Create reservation_status_history table if it doesn't exist
    - Drop and recreate the reservation_status_history_view with proper dependencies
    - Add appropriate RLS policies

  2. Security
    - Enable RLS for both table and view
    - Grant appropriate permissions
*/

-- Create the history table if it doesn't exist
CREATE TABLE IF NOT EXISTS reservation_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id uuid REFERENCES reservations(id) ON DELETE CASCADE,
  previous_status reservation_status NOT NULL,
  new_status reservation_status NOT NULL,
  changed_by uuid REFERENCES auth.users(id),
  changed_at timestamptz NOT NULL DEFAULT now(),
  table_number integer,
  reason text,
  CONSTRAINT valid_table_number CHECK (table_number > 0 AND table_number <= 30)
);

-- Enable RLS on the history table
ALTER TABLE reservation_status_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for the history table
CREATE POLICY "Les administrateurs peuvent voir l'historique"
  ON reservation_status_history
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Les administrateurs peuvent créer des entrées d'historique"
  ON reservation_status_history
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Drop the existing view
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

-- Enable RLS for the view
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reservation_status_history_reservation_id 
  ON reservation_status_history(reservation_id);
CREATE INDEX IF NOT EXISTS idx_reservation_status_history_changed_at 
  ON reservation_status_history(changed_at);