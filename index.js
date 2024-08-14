const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./src/routes/route');
const app = express();

dotenv.config();
const port = process.env.PORT;

app.use(express.json());

app.use('/user', userRouter);

app.listen(port, () => {
  console.log("App listening on port: ", port)
})