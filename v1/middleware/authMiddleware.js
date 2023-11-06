const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, 'admin@123');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Access denied. Invalid token.' });
  }
}

module.exports = authMiddleware;
