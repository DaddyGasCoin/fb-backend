const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  // Get the JWT from the request
  const token = req.cookies.jwt;
  // If there is no JWT, return an unauthorized status
  if (!jwt) {
    return res.sendStatus(401);
  }

  // Verify the JWT and get the user ID from the payload
  try {
    const { user } = jwt.verify(token, process.env.secret_key);
    req.userId = user;
    next();
  } catch (error) {
    // If the JWT is invalid, return an unauthorized status
    return res.sendStatus(401);
  }
}

module.exports = verifyJWT;
