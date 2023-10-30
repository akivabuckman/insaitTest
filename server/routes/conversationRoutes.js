import express from "express";
import { _addConversation, _getConversations, _populateConversations } from "../controllers/conversationController.js"


const conversationRouter = express.Router();
conversationRouter.post("/addConversation", _addConversation);
conversationRouter.post("/populate", _populateConversations)
conversationRouter.get("/getConversations", _getConversations)

export default conversationRouter;