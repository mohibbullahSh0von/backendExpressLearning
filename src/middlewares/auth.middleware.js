import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  let token = null;

  const reqHeaderAuthorization = req.get("Authorization");

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    // console.log("TOKEN:", token);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_PRIVATE_KEY);
      // console.log(decoded);
      req.userId = decoded.userId;
      return next();
    } catch (error) {
      return next(error);
    }
  }
  const error = new Error("Authentication Failed!!!");
  return next(error);
};

export default auth;
