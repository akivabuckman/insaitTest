import { timeBySubject, filterData, subjectByMonth, lengthBySubject, conversationsByGender, wordiness } from "../models/analyticModels.js";
import dotenv from "dotenv"
import chats from "../assets/chats.json" assert { type: "json"}
import knex from "knex";

dotenv.config();

export const _timeBySubject = async (req, res) => {
    const { startMonth, endMonth } = req.params;
    try {
        const response = await timeBySubject(startMonth, endMonth);
        res.json(response);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const _filterData = async (req, res) => {
    const { startMonth, endMonth } = req.params;
    try {
        const response = await filterData(startMonth, endMonth);
        res.json(response)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const _subjectByMonth = async (req, res) => {
    const { startMonth, endMonth } = req.params;
    try {
        const response = await subjectByMonth(startMonth, endMonth);
        res.json(response)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const _lengthBySubject = async (req, res) => {
    const { startMonth, endMonth } = req.params;
    try {
        const response = await lengthBySubject(startMonth, endMonth);
        res.json(response)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const _conversationsByGender = async (req, res) => {
    const { startMonth, endMonth } = req.params;
    try {
        const response = await conversationsByGender(startMonth, endMonth);
        res.json(response)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const _wordiness = async (req, res) => {
    const { startMonth, endMonth } = req.params;
    try {
        const response = await wordiness(startMonth, endMonth);
        res.json(response)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};