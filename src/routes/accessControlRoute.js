const express = require("express");
const login = require("../controllers/accessControlController");
const handleAsync = require("../common/handleAsync");

const accessControlRouter = express.Router();

accessControlRouter.post("/login", handleAsync(login));

module.exports = accessControlRouter;
