CREATE TABLE public.clients
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    gender character varying(50) COLLATE pg_catalog."default",
    first_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT clients_pkey PRIMARY KEY (id)
);


CREATE TABLE public.conversations
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    client_id integer NOT NULL,
    duration integer,
    subject character varying(20) COLLATE pg_catalog."default",
    exchanges character varying(2000)[] COLLATE pg_catalog."default",
    start_time timestamp(6) without time zone,
    CONSTRAINT conversations_pkey PRIMARY KEY (id),
    CONSTRAINT "conversations_clientId_fkey" FOREIGN KEY (client_id)
        REFERENCES public.clients (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)