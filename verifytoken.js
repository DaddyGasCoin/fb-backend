const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  // Get the JWT from the request
  const bearerHeader = req.headers["authorization"];
  // If there is no JWT, return an unauthorized status
  if (!bearerHeader) {
    return res.sendStatus(401);
  }
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Verify the JWT and get the user ID from the payload
    try {
      const { user } = jwt.verify(bearerToken, process.env.secret_key);
      req.userId = user;
      next();
    } catch (error) {
      // If the JWT is invalid, return an unauthorized status
      return res.sendStatus(401);
    }
  }
}

module.exports = verifyJWT;
