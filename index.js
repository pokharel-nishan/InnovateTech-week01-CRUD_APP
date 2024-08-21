const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./src/routes/userRoute");
const accessControlRouter = require("./src/routes/accessControlRoute");
const auth = require("./src/middlewares/authentication");
const userSeeder = require("./src/seeders/userSeeder");
const globalExceptionHandler = require("./src/middlewares/globalExceptionHandler");
const sequelize = require("./src/database/sequelizeInstance");
const User = require("./src/models/userModel");
const app = express();

dotenv.config();
const port = process.env.PORT;

app.use(express.json());

// Seeding the user data before the server starts, based on conditions in seeder function.
userSeeder();

app.use("/user", auth, userRouter);
app.use("/", accessControlRouter);

// implement global exception handler
app.use(globalExceptionHandler);

app.listen(port, async () => {
  console.log("App listening on port: ", port);
  try {
    console.log("Models:", sequelize.models); // Log all registered models
    console.log(sequelize)
    // await User.sync();
    // await sequelize.authenticate()
    await sequelize.sync({ force: true });
    console.log("Database connected successfully.")
  } catch (err) {
    console.log({
      Msg: "Unable to connect to database. ",
      Err: err.message,
    });
  }
});
