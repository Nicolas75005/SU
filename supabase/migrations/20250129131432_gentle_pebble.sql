/*
  # Fix Reservation Status History View and Dependencies

  1. Changes
    - Drop and recreate the history table with proper constraints
    - Create necessary indexes
    - Create the view with correct security context
    - Set up proper RLS policies

  2. Security
    - Enable RLS on all tables
    - Set up proper policies for authenticated users
    - Ensure view executes with correct security context
*/

-- First, drop the existing view if it exists
DROP VIEW IF EXISTS reservation_status_history_view;

-- Ensure the history table exists with proper structure
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
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'reservation_status_history' 
    AND policyname = 'Les administrateurs peuvent voir l''historique'
  ) THEN
    CREATE POLICY "Les administrateurs peuvent voir l'historique"
      ON reservation_status_history
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'reservation_status_history' 
    AND policyname = 'Les administrateurs peuvent créer des entrées d''historique'
  ) THEN
    CREATE POLICY "Les administrateurs peuvent créer des entrées d'historique"
      ON reservation_status_history
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;
END $$;

-- Create or replace indexes for better performance
DROP INDEX IF EXISTS idx_reservation_status_history_reservation_id;
DROP INDEX IF EXISTS idx_reservation_status_history_changed_at;

CREATE INDEX idx_reservation_status_history_reservation_id 
  ON reservation_status_history(reservation_id);
CREATE INDEX idx_reservation_status_history_changed_at 
  ON reservation_status_history(changed_at);

-- Create the view with security_invoker
CREATE VIEW reservation_status_history_view
WITH (security_invoker = true)
AS
SELECT
  h.id,
  h.reservation_id,
  h.previous_status,
  new_status,
  changed_at,
  table_number,
  reason,
  u.email as changed_by_email
FROM
  reservation_status_history h
  LEFT JOIN auth.users u ON h.changed_by = u.id;

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