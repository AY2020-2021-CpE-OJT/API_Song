const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes')(app) //routes

require('dotenv').config();

//connect to Mongodb Atlas
mongoose.connect(process.env.MONGO_URL,
{useNewUrlParser: true}).then(() => {
    console.log("Connected to Mongodb server");
})

//configure connection to MongoDb
const db = mongoose.connection;
db.on('error', console.error);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = process.env.port || 3000;


const server = app.listen(port,()=>{
console.log("Server is Running...");
});