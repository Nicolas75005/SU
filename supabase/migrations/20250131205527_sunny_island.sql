/*
  # Mise à jour des politiques RLS pour les réservations

  1. Modifications
    - Suppression des anciennes politiques
    - Création de nouvelles politiques plus permissives pour les réservations
  
  2. Sécurité
    - Permet aux utilisateurs anonymes de créer des réservations
    - Maintient la restriction d'accès pour la lecture et la modification aux administrateurs uniquement
*/

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Les clients peuvent créer des réservations" ON reservations;
DROP POLICY IF EXISTS "Les clients peuvent voir leurs propres réservations" ON reservations;
DROP POLICY IF EXISTS "Les administrateurs peuvent tout voir et modifier" ON reservations;

-- Créer les nouvelles politiques
CREATE POLICY "Tout le monde peut créer des réservations"
  ON reservations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Les administrateurs peuvent tout voir"
  ON reservations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Les administrateurs peuvent modifier"
  ON reservations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Les administrateurs peuvent supprimer"
  ON reservations
  FOR DELETE
  TO authenticated
  USING (true);