const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access Denied' });
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log('decoded', decoded);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid Token' });
  }
}

module.exports = verifyToken
