const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
    const orderCollection = client.db("GearUp").collection("orders");
    const userCollection = client.db("GearUp").collection("users");
    const carPartsCollection = client.db("GearUp").collection("carParts");
    const sellingCarCollection = client.db("GearUp").collection("sellingCars");
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

    // GET all rental bookings
    app.get('/orders', async (req, res) => {
      try {
        const result = await orderCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // POST a new rental booking
    app.post('/orders', async (req, res) => {
      try {
        const newBooking = req.body; 
        const result = await orderCollection.insertOne(newBooking);
        res.status(201).send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // GET all users
    app.get('/users', async (req, res) => {
      try {
        const result = await userCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // GET a specific user by ID
    app.get('/users/:userId', async (req, res) => {
      const userId = req.params.userId;

      try {
        const result = await userCollection.findOne({ _id: userId });
        if (result) {
          res.send(result);
        } else {
          res.status(404).send('User not found');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // PUT (update) a user by ID
    app.put('/users/:userId', async (req, res) => {
      const userId = req.params.userId;
      const updatedUserData = req.body;

      try {
        const result = await userCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $set: updatedUserData }
        );

        if (result.modifiedCount > 0) {
          res.send('User updated successfully');
        } else {
          res.status(404).send('User not found');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // POST a new user
    app.post('/users', async (req, res) => {
      try {
        const newUser = req.body;
        const result = await userCollection.insertOne(newUser);
        res.status(201).send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });


    // GET all car parts
    app.get('/carParts', async (req, res) => {
      try {
        const result = await carPartsCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // GET a specific car part by ID
    app.get('/carParts/:carPartId', async (req, res) => {
      const carPartId = req.params.carPartId;

      try {
        const result = await carPartsCollection.findOne({ _id: new ObjectId(carPartId) });
        if (result) {
          res.send(result);
        } else {
          res.status(404).send('Car part not found');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // PUT (update) a car part by ID
    app.put('/carParts/:carPartId', async (req, res) => {
      const carPartId = req.params.carPartId;
      const updatedCarPartData = req.body;

      try {
        const result = await carPartsCollection.updateOne(
          { _id: new ObjectId(carPartId )},
          { $set: updatedCarPartData }
        );

        if (result.modifiedCount > 0) {
          res.send('Car part updated successfully');
        } else {
          res.status(404).send('Car part not found');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // POST a new car part
    app.post('/carParts', async (req, res) => {
      try {
        const newCarPart = req.body;
        const result = await carPartsCollection.insertOne(newCarPart);
        res.status(201).send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // DELETE a car part by ID
    app.delete('/carParts/:carPartId', async (req, res) => {
      const carPartId = req.params.carPartId;

      try {
        const result = await carPartsCollection.deleteOne({ _id: new ObjectId(carPartId) });

        if (result.deletedCount > 0) {
          res.send('Car part deleted successfully');
        } else {
          res.status(404).send('Car part not found');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });



    // GET all selling cars
    app.get('/sellingCars', async (req, res) => {
      try {
        const result = await sellingCarCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // GET a specific selling car by ID
    app.get('/sellingCars/:sellingCarId', async (req, res) => {
      const sellingCarId = req.params.sellingCarId;

      try {
        const result = await sellingCarCollection.findOne({ _id: new ObjectId(sellingCarId) });
        if (result) {
          res.send(result);
        } else {
          res.status(404).send('Selling car not found');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // PUT (update) a selling car by ID
    app.put('/sellingCars/:sellingCarId', async (req, res) => {
      const sellingCarId = req.params.sellingCarId;
      const updatedSellingCarData = req.body;

      try {
        const result = await sellingCarCollection.updateOne(
          { _id: new ObjectId(sellingCarId) },
          { $set: updatedSellingCarData }
        );

        if (result.modifiedCount > 0) {
          res.send('Selling car updated successfully');
        } else {
          res.status(404).send('Selling car not found');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // POST a new selling car
    app.post('/sellingCars', async (req, res) => {
      try {
        const newSellingCar = req.body;
        const result = await sellingCarCollection.insertOne(newSellingCar);
        res.status(201).send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // DELETE a selling car by ID
    app.delete('/sellingCars/:sellingCarId', async (req, res) => {
      const sellingCarId = req.params.sellingCarId;

      try {
        const result = await sellingCarCollection.deleteOne({ _id: new ObjectId(sellingCarId) });

        if (result.deletedCount > 0) {
          res.send('Selling car deleted successfully');
        } else {
          res.status(404).send('Selling car not found');
        }
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
