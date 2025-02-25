/*
  # Système de réservation

  1. Nouvelles Tables
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
      - `special_requests` (text, demandes spéciales)
      - `created_at` (timestamptz, date de création)
      - `updated_at` (timestamptz, date de mise à jour)

  2. Sécurité
    - Enable RLS sur la table `reservations`
    - Politiques pour les clients et les administrateurs
    - Validation des données

  3. Indexes
    - Index sur date et statut pour les recherches fréquentes
    - Index sur created_at pour le tri
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
  time text NOT NULL CHECK (time ~ '^([0-1][0-9]|2[0-3]):[0-5][0-9]$'),
  guests integer NOT NULL CHECK (guests > 0 AND guests <= 20),
  status reservation_status NOT NULL DEFAULT 'pending',
  table_number integer CHECK (table_number > 0 AND table_number <= 30),
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
CREATE POLICY "Les clients peuvent créer des réservations"
  ON reservations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Les clients peuvent voir leurs propres réservations"
  ON reservations
  FOR SELECT
  TO anon
  USING (email = current_user);

CREATE POLICY "Les administrateurs peuvent tout voir et modifier"
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
    'jean@example.com',
    '0612345678',
    CURRENT_DATE,
    '19:00',
    4,
    'pending',
    NULL,
    'Table près de la fenêtre si possible'
  ),
  (
    'Marie Martin',
    'marie@example.com',
    '0687654321',
    CURRENT_DATE + INTERVAL '1 day',
    '20:30',
    2,
    'confirmed',
    8,
    NULL
  );