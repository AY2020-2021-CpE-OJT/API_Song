const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/index') //routes
const passportRouter = require('./routes/passport_routes')
const passport = require('passport');
const passportConfig = require('./passport/passport');

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
app.use('/auth',passportRouter);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
//passportConfig();

//routes
app.use('/', passport.authenticate('jwt',{session: false}), router);


const port = process.env.PORT || 3000;


const server = app.listen(port,()=>{
console.log("Server is Running...");
});