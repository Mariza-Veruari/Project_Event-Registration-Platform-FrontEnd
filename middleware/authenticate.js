const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("token",token)
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token.split(" ")[1], '12345abc');
    req.userData = decodedToken;
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = authenticate;
