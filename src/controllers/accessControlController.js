const verifyAccess = require('../services/accessControlService');

const login = async (req, res) => {
  const credentials = req.body;
  return res.status(200).json({ Token: await verifyAccess(credentials) })
};

module.exports = login;
