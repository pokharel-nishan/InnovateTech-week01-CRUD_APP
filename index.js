const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./src/routes/userRoute');
const accessControlRouter = require('./src/routes/accessControlRoute');
const auth = require('./src/middlewares/authentication');
const app = express();

dotenv.config();
const port = process.env.PORT;

app.use(express.json());

app.use('/user', auth, userRouter);
app.use('/', accessControlRouter);

app.listen(port, () => {
  console.log("App listening on port: ", port)
})

// data access - read, write in file -> make two functions -> make functions for reading and writing from file and put that in data access file. and call that function when we need to read or write from or to file 

// service - logic  -> implement all the logic from controller to service layer
// controller: just read the request header and body and pass the read data to service layer  -> give all the logic handling to service layer

// patch: partial update -> perform full update on put and partial update on patch -> like update lastname only or firstname only 

// read authentication from json -> verify the details with .json file rather than reading username and password from .env.

// casl for authorization -> not needed for now, but research on this topic 

// token: add role in jwt token for now 
// guard middleware implement for -> authorization 
