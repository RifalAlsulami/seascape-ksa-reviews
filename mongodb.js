import { MongoClient } from "mongodb";

const uri = "mongodb+srv://reefalalsulami_db_user:blX6kos7EqBb94RU@cluster0.vgde3wk.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);

export async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB Connected ✅");
    
    const db = client.db("SeaScapeDB");

    return db;
  } catch (error) {
    console.error("Connection Error:", error);
  }
}