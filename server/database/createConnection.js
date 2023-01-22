import { MongoClient } from "mongodb"
import "dotenv/config"

const url = process.env.MONGO_URL
const dbName = process.env.MONGO_DB_NAME

console.log("url: " + url);
console.log("dbName: " + dbName);

const client = new MongoClient(url)
await client.connect()
const db = client.db(dbName)

export default {
    polls: db.collection("polls"),
    admins: db.collection("admins")
}