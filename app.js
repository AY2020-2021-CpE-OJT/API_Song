const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = mongoose.connection;
db.on('error', console.error);
db.once('open',()=>{console.log("Connected to Mongodb server")});

mongoose.connect("mongodb+srv://daehyeon:skagnlfud0922@ojt.broz0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.port || 3000;

const router = require('./routes')(app)

const server = app.listen(port,()=>{
console.log("Server is Running...");
});