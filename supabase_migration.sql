-- Run this in your Supabase SQL Editor to add the quantity column
-- Go to: https://supabase.com/dashboard → Your Project → SQL Editor → New Query

-- Add quantity column to orders table (defaults to 1 for existing orders)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS quantity integer DEFAULT 1 NOT NULL;

-- Verify the change
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'orders' AND column_name = 'quantity';
