import db from "../config/db.js";

export const addConversation = (client_id, duration, start_time, subject, exchanges) => {
    return db("conversations")
    .insert({client_id, duration, start_time, subject, exchanges})
    .returning(["id"])
};

export const clearConversations = () => {
    return db("conversations").del();
};

export const exchangeDuplicates = () => {
    return db("conversations")
        .select("id")
        .whereIn("exchanges", function () {
            this.select("exchanges")
                .from("conversations")
                .groupBy("exchanges")
                .havingRaw("count(exchanges) > 1");
        });
};

export const conversationHeaders = () => {
    return db("conversations").columnInfo();
};

export const checkForBlanks = (header) => {
    return db("conversations")
    .select("id")
    .where(header, null)
};
