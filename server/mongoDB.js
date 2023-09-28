// Koneksi ke MongoDB Database kmeans-kopi

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI; // Make sure the database name is correct

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('MongoDB connected successfully'); // Add this line for debugging

    // Change the database and collection names here
    const database = client.db("kmeans-kopi");
    const collection = database.collection("uploaded");

    return { database, collection };
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}

module.exports = { connectToMongoDB, client };
