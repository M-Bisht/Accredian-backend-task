import enterAllDetailsErr from "../../helpers/errors/enterAllDetailsErr.js";
import bcrypt from "bcrypt";
import dbConfig from "../../db/dbConfig.js";
import jwt from "jsonwebtoken";
import util from "util";
import wrapAsync from "../../helpers/errors/wrapAsync.js";

const pool = dbConfig();
const queryAsync = util.promisify(pool.query).bind(pool);

const signin = wrapAsync(async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return enterAllDetailsErr(res);
  }

  email = email.trim();
  password = password.trim();

  const searchEmail = "SELECT * FROM user WHERE email = ?";
  const result = await queryAsync(searchEmail, [email]);

  if (result.length < 1) {
    return res.status(400).json({
      success: false,
      message: "User does not exist",
    });
  }

  const rightPassword = await bcrypt.compare(password, result[0].password);
  if (!rightPassword) {
    return res.status(400).json({
      success: false,
      message: "Wrong email or password",
    });
  }

  const tokenVal = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET);
  res.cookie("token", tokenVal, {
    httpOnly: true,
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
  });
});

export default signin;
