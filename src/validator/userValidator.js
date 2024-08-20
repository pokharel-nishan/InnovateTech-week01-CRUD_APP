const { body } = require("express-validator");
const validate = require("../middlewares/validator");

const validateProperty = [
  body("username", "Username should not be empty.").not().isEmpty(),
  body(
    "username",
    "Invalid Username. Minimum 5 characters is required."
  ).isLength({ min: 5 }),
  body("password", "Password should not be empty.").not().isEmpty(),
  body(
    "password",
    "Invalid Password. Minimum 6 characters is required."
  ).isLength({ min: 6 }),
  body("firstname", "Firstname should not be empty.").not().isEmpty(),
  body(
    "firstname",
    "Invalid Firstname. Minimum 3 characters is required."
  ).isLength({ min: 3 }),
  body("firstname", "Invalid Firstname. Maximum 20 characters.").isLength({
    max: 20,
  }),
  body("lastname", "Lastname should not be empty.").not().isEmpty(),
  body(
    "lastname",
    "Invalid Lastname. Minimum 3 characters is required."
  ).isLength({ min: 3 }),
  body("lastname", "Invalid Lastname. Maximum 20 characters.").isLength({
    max: 20,
  }),
]
const createUserValidator = validate(validateProperty);

const fullUserUpdateValidator = validate(validateProperty);

const partialValidateProperty = validateProperty.map(property => property.optional());

const partialUserUpdateValidator = validate(partialValidateProperty)


module.exports = {
  createUserValidator,
  fullUserUpdateValidator,
  partialUserUpdateValidator,
};

/*
Example: export const loginValidator = [
  body('email', 'Invalid does not Empty').not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
]

export const createValidator = [
  body('user.username', 'username does not Empty').not().isEmpty(),
  body('user.email', 'Invalid email').isEmail(),
  body('user.age', 'username must be Alphanumeric').isAlphanumeric(),
  body('user.birthday', 'Invalid birthday').isISO8601(), // check date is ISOString
  body('user.password', 'password does not Empty').not().isEmpty(),
  body('user.password', 'The minimum password length is 6 characters').isLength({min: 6}),
]

Example: 
app.post('/signup', validate([
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
]), async (req, res, next) => {
  // request is guaranteed to not have any validation errors.
  const user = await User.create({ ... });
});
*/

/*
[body("username", "Username should not be empty.").not().isEmpty(),
body(
  "username",
  "Invalid Username. Minimum 5 characters is required."
).isLength({ min: 5 }),
body("password", "Password should not be empty.").not().isEmpty(),
body(
  "password",
  "Invalid Password. Minimum 6 characters is required."
).isLength({ min: 6 })].map(valFunc => valFunc.optional())
*/

/*
// const partialUserUpdateValidator = validate([
//   body("username", "Invalid Username. Minimum 5 characters is required.")
//     .optional()
//     .isLength({ min: 5 }),
//   body("password", "Invalid Password. Minimum 6 characters is required.")
//     .optional()
//     .isLength({ min: 6 }),
//   body("firstname", "Firstname should not be empty.").not().isEmpty(),
//   body("firstname", "Invalid Firstname. Minimum 3 characters is required.")
//     .optional()
//     .isLength({ min: 3 }),
//   body("firstname", "Invalid Firstname. Maximum 20 characters.")
//     .optional()
//     .isLength({ max: 20 }),
//   body("lastname", "Lastname should not be empty.").not().isEmpty(),
//   body("lastname", "Invalid Lastname. Minimum 3 characters is required.")
//     .optional()
//     .isLength({ min: 3 }),
//   body("lastname", "Invalid Lastname. Maximum 20 characters.")
//     .optional()
//     .isLength({ max: 20 }),
// ]); */


