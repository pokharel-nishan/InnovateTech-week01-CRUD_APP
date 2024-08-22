// handle the asynchronous errors from the program.
// wrapper function that takes a route handler function as a parameter
// await custom error and then pass that error in next object to let global exception handler catch the asynchronous error, otherwise returns the return value from function.
function handleAsync(funct) {
  return async function asyncWrapper(...args) {
    const returnFromFunction = funct(...args); // return value from function (funct())
    const nextObj = args[args.length - 1]; // accessing the next object from (req, res, next)
    try {
      return await returnFromFunction; // returns the return value of route handler function
    } catch (err) {
      nextObj(err); // passes the error to next object
    }
  };
}

module.exports = handleAsync;
