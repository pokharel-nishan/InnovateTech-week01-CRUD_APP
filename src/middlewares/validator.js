const validate = validations => {
  return async (req, res, next) => {
    for (const validation of validations) {
      const error = await validation.run(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
      }
    }
    next()
  }
}

module.exports = validate;