const express = require("express");
const login = require("../controllers/accessControlController");
const handleAsync = require("../common/handleAsync");
// const validate = require("../validator/joiValidator");
// const validateData = require("../validator/yupValidator");
const validateDataZod = require("../validator/zodValidator");

const accessControlRouter = express.Router();

// accessControlRouter.post("/login", validate, handleAsync(login));

// accessControlRouter.post("/login", validateData, handleAsync(login));

accessControlRouter.post("/login", validateDataZod, handleAsync(login));

module.exports = accessControlRouter;
