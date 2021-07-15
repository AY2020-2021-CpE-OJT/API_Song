const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//configure connection to MongoDb
const db = mongoose.connection;
db.on('error', console.error);

//connect to Mongodb Atlas
mongoose.connect("mongodb+srv://daehyeon:skagnlfud0922@ojt.broz0.mongodb.net/task3?retryWrites=true&w=majority").then(() => {console.log("Connected to Mongodb server")});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.port || 3000;

const router = require('./routes')(app)

const server = app.listen(port,()=>{
console.log("Server is Running...");
});