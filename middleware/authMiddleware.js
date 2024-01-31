// middleware/authMiddleware

const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

function authMiddleware(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, `${JWT_SECRET_KEY}`);
    req.user = decoded;
    next();
  } catch (error) {
      
    res.status(500).json({ message: 'An error ocurred, contact admin support.' });
  }
}

module.exports = authMiddleware;
