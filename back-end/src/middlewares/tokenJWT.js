const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(authorization, secret);

    req.user = decoded;

    next();
  } catch (e) {
    return res.status(401).json({ error: 'Expired or invalid token' });
  }
};
