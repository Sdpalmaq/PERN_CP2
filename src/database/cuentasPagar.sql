-- Table: public.cp_proveedor

-- DROP TABLE IF EXISTS public.cp_proveedor;

CREATE TABLE IF NOT EXISTS public.cp_proveedor
(
    prov_cedula_ruc character varying(13) COLLATE pg_catalog."default" NOT NULL,
    pro_nombre character varying(50) COLLATE pg_catalog."default" NOT NULL,
    pro_direccion character varying(50) COLLATE pg_catalog."default" NOT NULL,
    pro_ciudad character varying(50) COLLATE pg_catalog."default" NOT NULL,
    pro_telefono character varying(13) COLLATE pg_catalog."default" NOT NULL,
    pro_correo character varying(30) COLLATE pg_catalog."default" NOT NULL,
    pro_credito_contado boolean NOT NULL,
    pro_estado boolean NOT NULL
    CONSTRAINT pk_proveedor PRIMARY KEY (prov_cedula_ruc)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.cp_proveedor
    OWNER to postgres;