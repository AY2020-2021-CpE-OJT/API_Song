const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router') //routes
const passport = require('passport');
const pass = require('./routes/passportRouter')

require('dotenv').config();
const app = express();
//connect to Mongodb Atlas
mongoose.connect(process.env.MONGO_URL,
{useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to Mongodb server");
})


//configure connection to MongoDb
const db = mongoose.connection;
db.on('error', console.error);

//middlewares
app.use('/passport', pass);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes

app.use('/', passport.authenticate('jwt', ({session:false})), router);

const port = process.env.PORT || 3000;


const server = app.listen(port,()=>{
console.log("Server is Running...");
});