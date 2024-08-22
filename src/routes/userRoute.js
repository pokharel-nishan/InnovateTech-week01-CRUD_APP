const express = require("express");
const {
  findAllUsers,
  findParticularUser,
  createUser,
  fullUserUpdate,
  partialUserUpdate,
  removeUser,
} = require("../controllers/userController");
const authorize = require("../middlewares/authorization");
const ROLES = require("../config/roles");
const {
  createUserValidator,
  fullUserUpdateValidator,
  partialUserUpdateValidator,
} = require("../validator/userValidator");
const handleAsync = require("../common/handleAsync");
const userRouter = express.Router();

// can access as per the roles
userRouter.get("/", authorize([ROLES.ADMIN]), handleAsync(findAllUsers));

userRouter.get(
  "/:id",
  authorize([ROLES.ADMIN, ROLES.USER]),
  handleAsync(findParticularUser),
);

userRouter.post(
  "/",
  authorize([ROLES.USER, ROLES.ADMIN]),
  createUserValidator,
  handleAsync(createUser),
);

userRouter.put(
  "/:id",
  authorize([ROLES.USER, ROLES.ADMIN]),
  fullUserUpdateValidator,
  handleAsync(fullUserUpdate),
);

userRouter.patch(
  "/:id",
  authorize([ROLES.USER, ROLES.ADMIN]),
  partialUserUpdateValidator,
  handleAsync(partialUserUpdate),
);

userRouter.delete(
  "/:id",
  authorize([ROLES.ADMIN, ROLES.USER]),
  handleAsync(removeUser),
);

module.exports = userRouter;
