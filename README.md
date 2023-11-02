# InsaitTest Project

This project consists of a React-based client application and a server component. Follow the steps below to set up and run the project.

## Setting Up the Database
1. The SQL code to create the database and it's tables can be found in
```
/InsaitTest/server/config/tables.sql
```
Run this code in a local database platform (PgAdmin or other).
2. Modify the .env file as needed to match the database credentials.

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
{"quantity": 100}
```
3. Run a new post request to populate initial conversations. The request should be made to:
```
http://localhost:5000/conversations/populate
```
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