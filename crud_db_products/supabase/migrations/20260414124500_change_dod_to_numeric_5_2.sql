-- Change dod from numeric(5,4) to numeric(5,2)
-- This allows values like 80.00 or 95.00 without numeric overflow.

ALTER TABLE public.productos
  ALTER COLUMN dod TYPE numeric(5,2)
  USING dod::numeric(5,2);
