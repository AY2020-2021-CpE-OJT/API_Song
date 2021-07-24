
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/routes') //routes
const passport = require('passport')
const passportConfig = require('./passport/passport')
const pass = require('./routes/auth')

require('dotenv').config();

//connect to Mongodb Atlas
mongoose.connect(process.env.MONGO_URL,
{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false}).then(() => {
    console.log("Connected to Mongodb server");
})


//configure connection to MongoDb
const db = mongoose.connection;
db.on('error', console.error);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//passport
app.use(passport.initialize());
passportConfig();

//routes
app.use('/',router);
app.use('/auth', pass);

const port = process.env.PORT || 3000;


const server = app.listen(port,()=>{
console.log("Server is Running...");
});