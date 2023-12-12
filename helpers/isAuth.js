import jwt from "jsonwebtoken";
import dbConfig from "../db/dbConfig.js";
import util from "util";
import wrapAsync from "./errors/wrapAsync.js";

const pool = dbConfig();
const queryAsync = util.promisify(pool.query).bind(pool);

const isAuth = wrapAsync(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login or signup first",
    });
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  const findUser = "SELECT * FROM user WHERE id = ?";
  const result = await queryAsync(findUser, [decodedData.id]);

  if (result.length < 1) {
    return res.status(401).json({
      success: false,
      message: "Please login or signup first",
    });
  }

  req.user = result[0];
  next();
});

export default isAuth;
