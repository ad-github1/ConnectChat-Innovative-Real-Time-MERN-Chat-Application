const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ad21:jEXAINW9mo4ZDBOX@cluster0.ksympvx.mongodb.net/?appName=Cluster0";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Ping successful!");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();
