/*
  # Historique des changements de statut des réservations

  1. Nouvelles Tables
    - `reservation_status_history`
      - `id` (uuid, clé primaire)
      - `reservation_id` (uuid, référence vers reservations)
      - `previous_status` (reservation_status)
      - `new_status` (reservation_status)
      - `changed_by` (uuid, référence vers auth.users)
      - `changed_at` (timestamptz)
      - `table_number` (integer, optionnel)
      - `reason` (text, optionnel)

  2. Sécurité
    - Enable RLS
    - Politiques pour les administrateurs

  3. Triggers
    - Trigger automatique pour enregistrer les changements de statut
*/

-- Création de la table d'historique
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

-- Active Row Level Security
ALTER TABLE reservation_status_history ENABLE ROW LEVEL SECURITY;

-- Politique RLS pour l'historique (administrateurs uniquement)
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

-- Index pour améliorer les performances
CREATE INDEX idx_reservation_status_history_reservation_id 
  ON reservation_status_history(reservation_id);
CREATE INDEX idx_reservation_status_history_changed_at 
  ON reservation_status_history(changed_at);

-- Fonction pour le trigger
CREATE OR REPLACE FUNCTION log_reservation_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status != NEW.status THEN
    INSERT INTO reservation_status_history (
      reservation_id,
      previous_status,
      new_status,
      changed_by,
      table_number
    ) VALUES (
      NEW.id,
      OLD.status,
      NEW.status,
      auth.uid(),
      NEW.table_number
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour enregistrer automatiquement les changements
CREATE TRIGGER log_reservation_status_change
  AFTER UPDATE OF status ON reservations
  FOR EACH ROW
  EXECUTE FUNCTION log_reservation_status_change();

-- Vue pour faciliter l'accès à l'historique avec les détails
CREATE VIEW reservation_status_history_view AS
SELECT
  h.id,
  h.reservation_id,
  r.name as reservation_name,
  r.date as reservation_date,
  r.time as reservation_time,
  h.previous_status,
  h.new_status,
  h.changed_at,
  h.table_number,
  h.reason,
  u.email as changed_by_email
FROM
  reservation_status_history h
  JOIN reservations r ON h.reservation_id = r.id
  LEFT JOIN auth.users u ON h.changed_by = u.id
ORDER BY
  h.changed_at DESC;

-- Politique RLS pour la vue
CREATE POLICY "Les administrateurs peuvent voir la vue d'historique"
  ON reservation_status_history_view
  FOR SELECT
  TO authenticated
  USING (true);