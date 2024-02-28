const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const nonSecurePaths = ["/login", "/logout", "/register"];

const createJWT = (payload) => {
  const key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (e) {
    console.log(e);
  }
  return token;
};

const verifyToken = (token) => {
  const key = process.env.JWT_SECRET;

  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (e) {
    throw e;
  }

  return decoded;
};

const checkUserLogin = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();

  const cookies = req.cookies;

  //we will get token from cookies first. If there is not any cookies, we will get token from header
  if (cookies && cookies.jwt) {
    const token = cookies.jwt;

    const decoded = verifyToken(token);

    //if user has valid cookíe => continue
    if (decoded) {
      req.user = decoded;
      next();
      //if user does not have cookies => authorize with bearer authorization
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Not authenticated the user",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated the user",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  //if user is in page login, register, or log out => not to check permission
  if (nonSecurePaths.includes(req.path)) return next();

  if (req.user) {
    const roles = req.user.groupWithRoles.Roles;

    const currentUrl = req.path;

    if (!roles || roles.length == 0) {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You don't have permission to access this resource",
      });
    }

    const checkUserRole = roles.some(
      (item) => item.url === currentUrl || currentUrl.includes(item.url)
    );

    if (checkUserRole) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You don't have permission to access this resource",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated the user",
    });
  }
};

module.exports = {
  createJWT,
  verifyToken,
  checkUserLogin,
  checkUserPermission,
};
