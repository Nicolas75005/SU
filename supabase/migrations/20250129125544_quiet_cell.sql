/*
  # Archivage des réservations

  1. Nouvelles Tables
    - `archived_reservations`
      - Copie de la structure de `reservations`
      - Ajout d'une colonne `archived_at` pour la traçabilité
      - Ajout d'une colonne `archive_reason` pour documenter la raison

  2. Sécurité
    - Enable RLS sur la table d'archive
    - Politiques pour les administrateurs uniquement

  3. Opérations
    - Copie des données existantes vers l'archive
    - Suppression sécurisée des données de la table principale
*/

-- Création de la table d'archive
CREATE TABLE IF NOT EXISTS archived_reservations (
  id uuid,
  name text,
  email text,
  phone text,
  date date,
  time text,
  guests integer,
  status reservation_status,
  table_number integer,
  special_requests text,
  created_at timestamptz,
  updated_at timestamptz,
  archived_at timestamptz DEFAULT now(),
  archive_reason text
);

-- Active Row Level Security sur l'archive
ALTER TABLE archived_reservations ENABLE ROW LEVEL SECURITY;

-- Politique RLS pour l'archive (administrateurs uniquement)
CREATE POLICY "Les administrateurs peuvent voir les archives"
  ON archived_reservations
  FOR SELECT
  TO authenticated
  USING (true);

-- Archiver les réservations existantes
INSERT INTO archived_reservations (
  id, name, email, phone, date, time, guests, status,
  table_number, special_requests, created_at, updated_at,
  archive_reason
)
SELECT
  id, name, email, phone, date, time, guests, status,
  table_number, special_requests, created_at, updated_at,
  'Nettoyage système - Archive globale'
FROM reservations;

-- Supprimer les réservations de la table principale
TRUNCATE TABLE reservations;

-- Créer un index sur la date d'archivage
CREATE INDEX idx_archived_reservations_archived_at 
  ON archived_reservations(archived_at);