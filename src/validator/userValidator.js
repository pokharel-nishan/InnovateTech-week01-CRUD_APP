const { body } = require("express-validator");
const validate = require("../middlewares/validator");

const validateProperty = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email should not be empty.")
    .isEmail()
    .withMessage("Enter valid email."),
  body("username")
    .notEmpty()
    .withMessage("Username should not be empty.")
    .isLength({ min: 5 })
    .withMessage("Invalid Username. Minimum 5 characters is required."),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password should not be empty.")
    .isLength({ min: 6 })
    .withMessage("Invalid Password. Minimum 6 characters is required."),
  body("firstname")
    .not()
    .isEmpty()
    .withMessage("Firstname should not be empty.")
    .isLength({ min: 3, max: 20 })
    .withMessage("Invalid Firstname. Must be between 3 and 20 characters."),
  body("lastname")
    .not()
    .isEmpty()
    .withMessage("Lastname should not be empty.")
    .isLength({ min: 3, max: 20 })
    .withMessage("Invalid Lastname. Must be between 3 and 20 characters."),
];

const createUserValidator = validate(validateProperty);
const fullUserUpdateValidator = validate(validateProperty);

const partialValidateProperty = validateProperty.map((property) =>
  property.optional(),
);
const partialUserUpdateValidator = validate(partialValidateProperty);

module.exports = {
  createUserValidator,
  fullUserUpdateValidator,
  partialUserUpdateValidator,
};
