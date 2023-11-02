# InsaitTest Project

This project consists of a React-based client application and a server component. Follow the steps below to set up and run the project.

## Setting Up the Database
The code to create the database and it's tables can be found in
```
/InsaitTest/server/config/tables.sql
```

## Setting Up the Server and Client
1. Navigate to the "client" folder:
```
/InsaitTest/client
```
2. Inside the "client" folder, run the following command to install the client's dependencies:
```
npm i
```
3. Navigate to the "server" folder, and run the same command to install the server's dependencies:
```
cd ../server
npm i
```

## Running the Project
1. While still in the "server" folder terminal, start the server with code:
```
npm start
```
2. To populate the tables with initial values:
Using a local API platform (Postman or other), run a post request to populate any number of clients. 10 is the recommended amount. The request should be made to:
```
http://localhost:5000/clients/populate
```
The body of the request should be (change quantity of clients if desired):
```
{"quantity": 100}
```
Run a new post request to populate initial conversations. The request should be made to:
```
http://localhost:5000/conversations/populate
```
The body of the request should be:
```
{"quantity": 100}
```
3. Back in the terminal, navigate to the "client" folder, and run the same command to start the client application:
```
cd ../client
npm start
```