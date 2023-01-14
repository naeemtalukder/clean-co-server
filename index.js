const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

//! Warning: Do not use in production
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());


const uri = `mongodb+srv://doctor_admin:AtRSYz5CoO53XqNo@cluster0.ao6h9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        await client.connect();
        const servicesCollection = client.db("cleanCo").collection("services");

        
        app.get("/get-services", async (req, res) => {
            const services = await servicesCollection.find({}).toArray();
            console.log(services);

            res.send(services);
        });

        app.post("/add-services", async (req, res) => {
          const data = req.body;
            const result = await servicesCollection.insertOne(data);
            res.send(result);
        });

        app.put("/update-services/:id", async (req, res) => {
          const {id} = req.params;
          const data = req.body;

          const filter = { _id: ObjectId(id) };
          const updateDoc = { $set: data };
          const option = { upsert: true };

          const result = await servicesCollection.updateOne(filter, updateDoc, option);

          res.send(result);
        });
        
        app.delete("/delete-services/:id", async (req, res) => {
          const {id} = req.params;
          const query = { _id: ObjectId(id) };
          const result = await servicesCollection.deleteOne(query);

          res.send(result);

        });

        /* With try catch block */
        // app.post("/add-services", async (req, res) => {
        //   try {
        //     const data = req.body;
        //     const result = await servicesCollection.insertOne(data);
        //     res.send({status: true, result: result});
            
        //   } catch(error) 
        //   {
        //     res.send({status: true, result: result});
        //   }
        // });
      
    } finally {
    }
  }
  run().catch(console.dir);
 


// Body
  app.get("/dummy-route/user2", async (req, res) => {
    const data = req.body;
    
    res.json(data);
  });


// Query
  app.get("/dummy-route/user", async (req, res) => {
    const {name, age} = req.query;
    console.log(name);
    console.log(age);
    res.json(name);
  });


// Param
  app.get("/dummy-route/user/:id", async (req, res) => {
    const {id}= req.params;
   
    res.json(id);
  });
  
  app.get("/", async (req, res) => {
    res.json("Hello");
  });
  
  app.listen(port, () => {
    console.log(`Ami Dowracchi port ${port}`);
  });