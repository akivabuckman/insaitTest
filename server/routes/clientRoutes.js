import express from "express";
import { _addClient, _getClients, _populateClients } from "../controllers/clientController.js"

const clientRouter = express.Router();
clientRouter.get("/getClients", _getClients);
clientRouter.post("/populate", _populateClients);
clientRouter.post("/addClient", _addClient);
export default clientRouter;
