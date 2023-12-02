const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8syzx0j.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    const destinationCollection = client.db("GearUp").collection("destinations");
    const carCollection = client.db("GearUp").collection("cars");

    // destinations collection APIs
    app.get('/destinations', async (req, res) => {
      try {
        const result = await destinationCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // destinations collection APIs
    app.get('/cars', async (req, res) => {
      try {
        const result = await carCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close(); // Do not close the client here, keep it open while the server is running
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('GearUp is active');
});

app.listen(port, () => {
  console.log(`GearUp is running on port ${port}`);
});
