import fs from 'fs';
import Parse from "parse/node";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const APP_ID = process.env.PARSE_APP_ID || '5ArcuTe5JcqXnW0wE9BAkQynGnfM6ScZ38V03FlR';
const JS_KEY = process.env.PARSE_JS_KEY || 'Q4moQX4vvWwcg7P5RWhLImD81LF4ACwneCDjB1sI';
const SERVER_URL = process.env.PARSE_SERVER_URL || 'https://parseapi.back4app.com/';

export class DB {
    static init() {
        Parse.initialize(APP_ID, JS_KEY);
        Parse.serverURL = SERVER_URL;
    }

    static async saveInfoToDatabase() {
        try {
            const nodeInfo = Parse.Object.extend('nodes');
            const newNode = new nodeInfo();

            const response = await axios.get('https://api.ipify.org?format=json');
            const ip = response.data.ip;

            newNode.set('displayName', uuidv4());
            newNode.set('nodeIdentifier', uuidv4());
            newNode.set('ipAddress', ip);
            newNode.set('status', 1);
            await newNode.save();

            const data = {
                id: newNode.id,
                nodeIdentifer: newNode.get('nodeIdentifier'),
                ipAddress: newNode.get('ipAddress')
            };

            // Escrever os dados em um arquivo local
            fs.writeFileSync('data.json', JSON.stringify(data));
            
            console.log('Data saved successfully.');

            return data;
        } catch (error) {
            console.error("Error saving info to database:", error);
            //throw error; // ou return null; dependendo do contexto
        }
    }
}
