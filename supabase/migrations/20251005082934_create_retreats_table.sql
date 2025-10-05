/*
  # Create retreats management system

  1. New Tables
    - `retreats`
      - `id` (text, primary key) - Unique retreat identifier (e.g., 'kyoto-chishakuin')
      - `title_ja` (text) - Japanese title
      - `title_en` (text) - English title
      - `location_ja` (text) - Japanese location
      - `location_en` (text) - English location
      - `duration` (integer) - Duration in days
      - `price` (integer) - Price in yen
      - `capacity` (integer) - Maximum capacity
      - `type` (text) - 'domestic' or 'international'
      - `image` (text) - Image URL or path
      - `description_ja` (text) - Japanese short description
      - `description_en` (text) - English short description
      - `long_description_ja` (text) - Japanese long description
      - `long_description_en` (text) - English long description
      - `includes_ja` (jsonb) - Array of included items in Japanese
      - `includes_en` (jsonb) - Array of included items in English
      - `schedule_ja` (jsonb) - Array of schedule items in Japanese
      - `schedule_en` (jsonb) - Array of schedule items in English
      - `display_order` (integer) - Order for display
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `retreats` table
    - Add policy for public read access (no authentication required)
*/

CREATE TABLE IF NOT EXISTS retreats (
  id text PRIMARY KEY,
  title_ja text NOT NULL,
  title_en text NOT NULL,
  location_ja text NOT NULL,
  location_en text NOT NULL,
  duration integer NOT NULL DEFAULT 0,
  price integer NOT NULL DEFAULT 0,
  capacity integer NOT NULL DEFAULT 0,
  type text NOT NULL DEFAULT 'domestic',
  image text NOT NULL DEFAULT '',
  description_ja text NOT NULL DEFAULT '',
  description_en text NOT NULL DEFAULT '',
  long_description_ja text NOT NULL DEFAULT '',
  long_description_en text NOT NULL DEFAULT '',
  includes_ja jsonb NOT NULL DEFAULT '[]'::jsonb,
  includes_en jsonb NOT NULL DEFAULT '[]'::jsonb,
  schedule_ja jsonb NOT NULL DEFAULT '[]'::jsonb,
  schedule_en jsonb NOT NULL DEFAULT '[]'::jsonb,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE retreats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read retreats"
  ON retreats
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS retreats_type_idx ON retreats(type);
CREATE INDEX IF NOT EXISTS retreats_display_order_idx ON retreats(display_order);