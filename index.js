const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./src/routes/userRoute');
const accessControlRouter = require('./src/routes/accessControlRoute');
const auth = require('./src/middlewares/authentication');
const userSeeder = require('./src/seeders/userSeeder');
const globalExceptionHandler = require('./src/middlewares/globalExceptionHandler');
const app = express();

dotenv.config();
const port = process.env.PORT;

app.use(express.json());

// Seeding the user data before the server starts, based on conditions in seeder function. 
userSeeder();

app.use('/user', auth, userRouter);
app.use('/', accessControlRouter);


// implement global exception handler
app.use(globalExceptionHandler);

app.listen(port, () => {
  console.log("App listening on port: ", port)
})