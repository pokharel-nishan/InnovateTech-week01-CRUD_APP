const verifyAccess = require('../services/accessControlService');

const login = (req, res) => {
  const credentials = req.body;
  const result = verifyAccess(credentials);
  if (result.success) {
    return res.status(200).json({ Token: result.data })
  }
  return res.status(404).json({ Message: result.message })
};

module.exports = login;
