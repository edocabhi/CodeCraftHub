const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // List of routes that do not require authentication
  const openRoutes = ['/api/users/register', '/api/users/login'];

  // Check if the current route is in the list of open routes
  if (openRoutes.includes(req.path)) {
    return next();
  }

  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = authMiddleware;