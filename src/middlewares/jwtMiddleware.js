const { verifyToken } = require('../utils/jwt');

function isAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.split(' ')[1];
    try {
      const decode = verifyToken(token);
      req.userId = decode.userId;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ error: 'Token not provided' });
  }
}

module.exports = { isAuthenticated };
