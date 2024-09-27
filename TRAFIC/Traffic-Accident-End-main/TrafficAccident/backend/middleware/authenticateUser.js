const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

const verifyRefreshToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, "asdsad");
    return decoded;
  } catch (error) {
    console.error("Refresh token verification failed:", error);
    return null;
  }
};

const verifyAccessToken = (accessToken) => {
  try {
    const decoded = jwt.verify(accessToken, "asdsad");
    return decoded;
  } catch (error) {
    console.error("Access token verification failed:", error);
    return null;
  }
};

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).send({ error: "Authorization denied" });
  }

  const decodedToken = verifyAccessToken(token);

  if (!decodedToken) {
    return res.status(httpStatus.FORBIDDEN).send({ error: "Invalid access token" });
  }

  req.user = decodedToken;
  next();
};

module.exports = {
  verifyRefreshToken,
  verifyAccessToken,
  authenticateUser,
};
