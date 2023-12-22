const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.static("public"));
var cookieParser = require('cookie-parser')
const port = process.env.PORT || 5000
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',
  'https://jobs-task.web.app'],
  credentials: true,
}))
app.use(cookieParser())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Job-Task:4rwpaO14kuyahzKl@cluster0.dhtqvw7.mongodb.net/?retryWrites=true&w=majority";

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
    const jobtask = client.db("task").collection("jobtask");

    app.get('/jobtask', async (req, res) => {
      const cursor = jobtask.find()
      const result = await cursor.toArray()
      res.send(result)
    })

      app.post('/addtask', async (req, res) => {
      const document = req.body;
      const result = await jobtask.insertOne(document)
      res.send(result)
    })
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})