import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.status(401).send("Unauthorized");
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_KEY);
  } catch (error) {
    res.status(500).send("Unauthorized");
  }
  if (!decodedToken) {
    res.status(401).send("Unauthorized");
  } else {
    req.role = decodedToken.role;
  }
  next();
};
