const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 2020;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const pass = "AAnKERudLrcwzM2";

const uri = "mongodb+srv://VN-User:AAnKERudLrcwzM2@cluster0.wqjmg.mongodb.net/VN-User-Data?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World!')
});

client.connect(err => {
    const collection = client.db("VN-User-Data").collection("RegisteredEvents");
    
    app.post("/addEvents", (req, res) => {
        const evt = req.body;
        collection.insertOne(evt)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
    });
    app.get("/getEvents",(req,res) => {
        collection.find({email: req.query.email})
        .toArray((err,documents) => {
            res.send(documents)
        })
    })

    app.delete('/delete/:id',(req,res)=>{
        // console.log(req.params.id);
        collection.deleteOne({_id:ObjectId(req.params.id)})
        .then(result => {
            
        })
    })
   
});


app.listen(process.env.PORT || port);