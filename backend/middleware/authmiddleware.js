const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // 💡 Get token from the x-auth-token headerxx  x 
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    // Attach the decoded user object to the request
    req.user = decoded.user;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token is invalid, return an error
    res.status(401).json({ msg: 'Token is not valid' });
  }
};