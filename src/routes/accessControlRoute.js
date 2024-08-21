const express = require("express");
const login = require("../controllers/accessControlController");

const accessControlRouter = express.Router();

accessControlRouter.post("/login", login);

module.exports = accessControlRouter;
