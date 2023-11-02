# InsaitTest Project

This project consists of a React-based client application, a server component, and a database. Follow the steps below to set up and run the project.

## Setting Up the Database
1. In a local database platform (PgAdmin or other), create an empty database, and run the code below to initialize the database's tables.
```
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
```
2. Create a .env file to match the chosen database credentials. The .env file should be created in:
```
/InsaitTest/server
```
It's variables should be named as shown. Fill in the credentials as set up in your local database:
```
DBCLIENT=
DBHOST=
DBPORT=
DBUSER=
DBPW=
DB=
```

## Setting Up the Server
1. Navigate to the "server" folder terminal:
```
/InsaitTest/server
```
2. Inside the "server" folder terminal, run the following command to install the client's dependencies:
```
npm i
```

## Running the Server and Populating Databases
1. While still in the "server" folder terminal, start the server with code:
```
npm start
```
2. To populate the tables with initial values:
Using a local API platform (Postman or other), run a post request to populate any number of clients. 10 is the recommended amount. The request should be made to:
```
http://localhost:5000/clients/populate
```
If a different port number was used, adjust accordingly.
The body of the request should be (change quantity of clients if desired):
```
{"quantity": 10}
```
3. Run a new post request to populate initial conversations. The request should be made to:
```
http://localhost:5000/conversations/populate
```
If a different port number was used, adjust accordingly.
The body of the request should be:
```
{"quantity": 100}
```

## Setting Up and Running the Client
4. In the terminal, navigate to the "client" folder, and run these commands to install dependencies and start the client application:
```
cd ../client
npm i
npm start
```
The program should run locally in the browser.