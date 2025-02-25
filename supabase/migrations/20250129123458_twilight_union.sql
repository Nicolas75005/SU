/*
  # Création de la table des réservations

  1. Nouvelle Table
    - `reservations`
      - `id` (uuid, clé primaire)
      - `name` (text, nom du client)
      - `email` (text, email du client)
      - `phone` (text, téléphone du client)
      - `date` (date, date de la réservation)
      - `time` (text, heure de la réservation)
      - `guests` (integer, nombre de personnes)
      - `status` (enum, statut de la réservation)
      - `table_number` (integer, numéro de table optionnel)
      - `special_requests` (text, demandes spéciales optionnelles)
      - `created_at` (timestamp avec fuseau horaire)
      - `updated_at` (timestamp avec fuseau horaire)

  2. Sécurité
    - Active RLS sur la table
    - Ajoute des politiques pour les utilisateurs authentifiés
*/

-- Création du type enum pour le statut
CREATE TYPE reservation_status AS ENUM ('pending', 'confirmed', 'cancelled');

-- Création de la table reservations
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  guests integer NOT NULL CHECK (guests > 0 AND guests <= 20),
  status reservation_status NOT NULL DEFAULT 'pending',
  table_number integer,
  special_requests text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Active Row Level Security
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Création d'un trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON reservations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Politiques RLS
CREATE POLICY "Les administrateurs peuvent tout voir"
  ON reservations
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Index pour améliorer les performances
CREATE INDEX idx_reservations_date ON reservations(date);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_created_at ON reservations(created_at);

-- Données de test
INSERT INTO reservations (
  name,
  email,
  phone,
  date,
  time,
  guests,
  status,
  table_number,
  special_requests
) VALUES
  (
    'Jean Dupont',
    'jean.dupont@example.com',
    '0612345678',
    CURRENT_DATE,
    '19:30',
    4,
    'confirmed',
    12,
    'Près de la fenêtre si possible'
  ),
  (
    'Marie Martin',
    'marie.martin@example.com',
    '0687654321',
    CURRENT_DATE + INTERVAL '1 day',
    '20:00',
    2,
    'confirmed',
    8,
    'Anniversaire de mariage'
  ),
  (
    'Pierre Durand',
    'pierre.durand@example.com',
    '0698765432',
    CURRENT_DATE + INTERVAL '2 days',
    '19:00',
    6,
    'pending',
    NULL,
    'Allergique aux fruits de mer'
  );