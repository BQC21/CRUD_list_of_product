-- Migration: normalize column naming in public.productos
-- Note: this script uses guarded DO blocks so it is safe to run once even if
-- some columns were already renamed.

BEGIN;

-- Example 1: camelCase -> snake_case
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'productos'
      AND column_name = 'powerSource'
  )
  AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'productos'
      AND column_name = 'power_source'
  ) THEN
    ALTER TABLE public.productos
      RENAME COLUMN "powerSource" TO power_source;
  END IF;
END
$$;

-- Example 2: Spanish name -> canonical snake_case
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'productos'
      AND column_name = 'tipoConexion'
  )
  AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'productos'
      AND column_name = 'tipo_conexion'
  ) THEN
    ALTER TABLE public.productos
      RENAME COLUMN "tipoConexion" TO tipo_conexion;
  END IF;
END
$$;

-- Example 3: fix typo in naming
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'productos'
      AND column_name = 'codproveedor'
  )
  AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'productos'
      AND column_name = 'cod_prov'
  ) THEN
    ALTER TABLE public.productos
      RENAME COLUMN codproveedor TO cod_prov;
  END IF;
END
$$;

COMMIT;
