const Yup = require('yup');

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
});


const validateData = async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false }); // Validates all fields before throwing an error
    next();
  } catch (error) {
    return res.status(400).send(error.errors);
  }
};

module.exports = validateData;
