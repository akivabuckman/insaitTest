import express from 'express';
import dotenv from "dotenv";
import clientRouter from './routes/clientRoutes.js';
import conversationRouter from './routes/conversationRoutes.js'
import analyticRouter from "./routes/analyticRoutes.js"
import cors from "cors";
import path from "path";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT;

dotenv.config();

const __dirname = path.resolve();


app.use(express.json());
app.use(cors());

app.use("/", express.static(__dirname + "/public"));

app.use("/clients", clientRouter);
app.use("/conversations", conversationRouter);
app.use("/analytics", analyticRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// DEPLOYMENT
app.use(express.static(path.join(__dirname, "client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
