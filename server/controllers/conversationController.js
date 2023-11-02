import { addConversation, clearConversations, exchangeDuplicates, conversationHeaders, checkForBlanks } from "../models/conversationModels.js";
import dotenv from "dotenv"
import chats from "../assets/chats.js";
import fetch from "node-fetch";


dotenv.config()

export const _addConversation = async (req, res) => {
    try {
        // randomly choose client id from existing clients
        const clientsResponse = await fetch("https://insait.onrender.com/clients/getClients");
        if (!clientsResponse.ok) {
            res.status(clientsResponse.status).json({ error: 'Client request failed' });
            return;
        }
        const clientsData = await clientsResponse.json();
        const clientIds = clientsData.map(i => i.id); // array of existing client id's
        const client_id = clientIds[Math.floor(Math.random()*clientIds.length)];


        // generate start time, so that average time is 11:30
        // hour
        const hour = Math.floor((Math.random()*24 + Math.random()*23) / 2).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false}) // averages two integers between 0 and 23, then converts to two-character string
        const minute = (Math.floor(Math.random()*60)).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false}); // random int between 0-59, in string
        const second = (Math.floor(Math.random()*60)).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false}); // random int between 0-59, in string
        const year = "2023" // assume all this year
        const month = ((Math.floor(Math.random()*10)+1).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false})) // between january and october, 1-10
        const day = ((Math.floor(Math.random()*28)+1).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false})) // avoid february bugs, assume all 1-28
        const start_time = `${year}-${month}-${day}T${hour}:${minute}:${second}`
        
        // duration
        const duration = Math.floor(Math.random()*60); // up to an hour

        // chat
        const exchanges = chats[req.body.chatIndex];

        // rudimentary function to determine subject
        const chatText = JSON.stringify(exchanges);
        let subject;
        if (chatText.includes("mortgage")) {
            subject = "mortgages"
        } else if (chatText.includes("wire")) {
            subject = "wire transfers"
        } else if (chatText.includes("transfer")) {
            subject = "transfers"
        } else if (chatText.includes("credit card")) {
            subject = "credit cards"
        } else if (chatText.includes("account")) {
            subject = "accounts"
        } else if (chatText.includes("invest")) {
            subject = "investments"
        } else {
            subject = "other"
        }
        
        // save to db
        const row = await addConversation(client_id, duration, start_time, subject, exchanges);
        res.json(row)

    } catch (error) {
      res.status(404).json({ msg: "err" });
    }
};

export const _populateConversations = async (req, res) => {
    // takes argument of how many conversations to create
    const quantity = req.body.quantity;
    try {
        // clear old conversations before new populating
        await clearConversations();

        // call _addConversation X times, function of given quantity
        for (let chatIndex = 0; chatIndex < quantity; chatIndex++) {
            const response = await fetch("https://insait.onrender.com/conversations/addConversation", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    chatIndex: chatIndex
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to add conversation: ${chatIndex}`);
            }
        };

        // data validation
        // verify no duplicate exchanges, using knex
        const duplicateIds = await exchangeDuplicates();
        if (duplicateIds.length > 0) {
            res.json({ msg: "duplicates found"})
        };

        // verify no blanks, in each column
        const columnInfo = await conversationHeaders();
        const headers = Object.keys(columnInfo);
        const allBlanks = [];
        const blanksFound = false;
        for (let header of headers) {
            const blanks = await checkForBlanks(header);
            if (blanks.length > 0) {
                allBlanks.push({header: blanks})
                blanksFound = true
            };
        };
        if (blanksFound) {
            res.json({"blanks were found:": allBlanks.toString()})
        };

        res.json({ msg: "Conversations added successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};
