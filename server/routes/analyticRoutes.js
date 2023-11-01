import express from "express";
import { _timeBySubject, _filterData, _subjectByMonth, _lengthBySubject, _conversationsByGender, _wordiness } from "../controllers/analyticController.js"


const analyticRouter = express.Router();
analyticRouter.get("/timeBySubject/:startMonth/:endMonth", _timeBySubject);
analyticRouter.get("/subjectByMonth/:startMonth/:endMonth", _subjectByMonth);
analyticRouter.get("/lengthBySubject/:startMonth/:endMonth", _lengthBySubject);
analyticRouter.get("/conversationsByGender/:startMonth/:endMonth", _conversationsByGender);
analyticRouter.get("/wordiness/:startMonth/:endMonth", _wordiness)

export default analyticRouter;