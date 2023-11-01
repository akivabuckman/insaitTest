import express from 'express';
import dotenv from "dotenv";
import clientRouter from './routes/clientRoutes.js';
import conversationRouter from './routes/conversationRoutes.js'
import analyticRouter from "./routes/analyticRoutes.js"
import cors from "cors";


const app = express();
const port = process.env.PORT;

dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/clients", clientRouter);
app.use("/conversations", conversationRouter);
app.use("/analytics", analyticRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
