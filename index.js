const express = require("express");
const cors =require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;


//! Warning: Do not use in production
app.use(
    cors({
        origin: "*",
    })
    );

app.use(express.json());




const uri = "mongodb+srv://clean_co:RzhtKyVYjzGB0cVn@cluster0.wkeh8wb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const sevicesCollection = client.db("cleanCo").collection("service");
        app.get("/service", async(req, res) => {
            const services =await sevicesCollection.find({}).toArray();

            res.send(services);
        });
      
    } finally {
       
    }
  }
  run().catch(console.dir);


app.get("/", async(req, res) => {
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(`ami jamu port ${port}`);
});