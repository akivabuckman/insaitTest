import express from "express";
import { _timeBySubject, _filterData } from "../controllers/analyticController.js"


const analyticRouter = express.Router();
analyticRouter.get("/timeBySubject/:startMonth/:endMonth", _timeBySubject);
analyticRouter.get("/filterData/:startMonth/:endMonth", _filterData)

export default analyticRouter;