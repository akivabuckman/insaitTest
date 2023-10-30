import express from 'express';
import dotenv from "dotenv";
import clientRouter from './routes/clientRoutes.js';
import conversationRouter from './routes/conversationRoutes.js'
import analyticRouter from "./routes/analyticRoutes.js"
import cors from "cors";


const app = express();
const port = 5000;
// const { Pool } = pg;
dotenv.config();

// const dbConfig = {
//   user: 'postgres',
//   host: 'localhost',
//   database: 'insaitTestDB',
//   password: process.env.DBPW,
//   port: 5432,
// };

// const pool = new Pool(dbConfig);

app.use(express.json());
app.use(cors());


// app.get('/getUsers', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM conversations');
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error querying the database:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.use("/clients", clientRouter);
app.use("/conversations", conversationRouter);
app.use("/analytics", analyticRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
