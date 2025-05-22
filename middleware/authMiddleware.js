import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorizaton;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ msg: " Authorization denied. No token. " });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token." });
  }
};
