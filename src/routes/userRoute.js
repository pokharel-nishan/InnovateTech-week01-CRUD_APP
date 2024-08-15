const express = require('express');
const { findAllUsers, findParticularUser, createUser, fullUserUpdate, partialUserUpdate, removeUser } = require('../controllers/userController');
const authorize = require('../middlewares/authorization');
const ROLES = require('../config/roles')
const userRouter = express.Router();

// can access as per the roles 
// userRouter.get('/', auth, authorize(['admin', 'user']), findAllUsers);
userRouter.get('/', authorize([ROLES.ADMIN]), findAllUsers);

userRouter.get('/:id', authorize([ROLES.USER, ROLES.USER]), findParticularUser);

userRouter.post('/', authorize([ROLES.USER]), createUser);

userRouter.put('/:id', authorize([ROLES.USER]), fullUserUpdate);

userRouter.patch('/:id', authorize([ROLES.USER]), partialUserUpdate);

userRouter.delete('/:id', authorize([ROLES.ADMIN]), removeUser);

module.exports = userRouter;
