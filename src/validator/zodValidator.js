const z = require('zod')

const UserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
});


const validateDataZod = (req, res, next) => {
  try {
    // Use .parse() to validate the data; throws an error if validation fails
    UserSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).send(error.errors.map(err => err.message));
  }
};

module.exports = validateDataZod;

// // Type inference in action
// const validUserData = {
//   username: 'johnsmith',
//   email: 'john@example.com',
//   password: 'strongpassword123'
// };

// const myUser = UserSchema.parse(validUserData);

// // TypeScript infers the type of 'myUser' as:
// // { username: string; email: string; password: string; age?: number }