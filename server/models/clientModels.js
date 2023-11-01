import db from "../config/db.js";

export const addClient = (gender, first_name, last_name) => {
    return db("clients")
    .insert({gender, first_name, last_name})
    .returning(["gender"])
};

export const getClients = () => {
    return db("clients")
    .select("id", "gender", "first_name", "last_name")
    .orderBy("id")
};
