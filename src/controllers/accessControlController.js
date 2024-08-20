const verifyAccess = require('../services/accessControlService');

const login = (req, res) => {
  const credentials = req.body;
  return res.status(200).json({ Token: verifyAccess(credentials) })
};

module.exports = login;
