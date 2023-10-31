import { faker } from '@faker-js/faker';
import { addClient, getClients } from "../models/clientModels.js";
import dotenv from "dotenv"


dotenv.config()

export const _addClient = async (req, res) => {
    const gender = Math.random() > 0.5 ? "male" : "female";
    const first_name = faker.person.firstName(gender).toLowerCase();
    const last_name = faker.person.lastName(gender).toLowerCase();
  
    try {
      const row = await addClient(gender, first_name, last_name);
      res.json(row);
    } catch (e) {
      console.log(e);
      res.status(404).json({ msg: "err" });
    }
};

export const _getClients = async (req, res) => {
  try {
    const clients = await getClients();
    res.json(clients);
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: "err" });
  }
};

export const _populateClients = async (req, res) => {
  const quantity = req.body.quantity;
  try {
      // call _addClient X times, function of given quantity
      for (let clientIndex = 0; clientIndex < quantity; clientIndex++) {
          const response = await fetch("http://localhost:5000/clients/addClient", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({})
          });

          if (!response.ok) {
              throw new Error(`Failed to add client: ${clientIndex}`);
          }
      }

      res.json({ msg: "Clients added successfully" });
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
};
