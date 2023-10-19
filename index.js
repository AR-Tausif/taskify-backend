const express = require('express')
const env = require('dotenv').config()
const cors = require('cors')
const app = express()
const port = 3000
// cors responding
app.use(cors())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_SECRET_KEY}@cluster0.kgrh0ns.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

        
    const servicesCollection = client.db("taskifyTask").collection("allTasks");



      app.get("/tasks", async (req, res) => {
        const result = await servicesCollection.find().toArray();
        console.log('thisi is')
        //   console.log(result);
        res.send(result);
      });
      app.post("/tasks", async (req, res) => {
        const data = { "prodId": 100, "price": 20, "quantity": 125 }
        const result = await servicesCollection.insertOne(data)
        //   console.log(result);
        res.send(result);
      });

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!s')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})