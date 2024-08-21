const { BadRequest } = require("../exceptions/exceptionHandlers");

const validate = (validations) => {
  return async (req, res, next) => {
    try {
      for (const validation of validations) {
        const result = await validation.run(req);
        console.log(result);
        if (!result.isEmpty()) {
          return next(
            new BadRequest(
              result
                .array()
                .map((error) => error.msg)
                .join(", "),
            ),
          );
        }
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = validate;
