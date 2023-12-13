import util from "util";
import enterAllDetailsErr from "../../helpers/errors/enterAllDetailsErr.js";
import bcrypt from "bcrypt";
import dbConfig from "../../db/dbConfig.js";
import idGenerator from "../../helpers/idGenerator.js";
import wrapAsync from "../../helpers/errors/wrapAsync.js";
import jwt from "jsonwebtoken";

const pool = dbConfig();
const queryAsync = util.promisify(pool.query).bind(pool);

const checkExistingUser = async (email) => {
  const searchEmail = "SELECT * FROM user WHERE email = ?";
  const results = await queryAsync(searchEmail, [email]);
  return results.length > 0;
};

const insertUser = async (newId, name, email, hashPassword) => {
  const insertData =
    "INSERT INTO user (id, name, email, password) VALUES (?, ? ,?, ?)";
  await queryAsync(insertData, [newId, name, email, hashPassword]);
};

const signup = wrapAsync(async (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return enterAllDetailsErr(res);
  }

  name = name.trim();
  email = email.trim();
  password = password.trim();

  const userExists = await checkExistingUser(email);

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const newId = idGenerator();
  const hashPassword = await bcrypt.hash(password, 10);

  await insertUser(newId, name, email, hashPassword);

  const tokenVal = jwt.sign({ id: newId }, process.env.JWT_SECRET);
  res.cookie("token", tokenVal, {
    httpOnly: true,
    secure: true, // Requires HTTPS
    path: "/", // Adjust the path if needed
    domain: 'http://localhost:5173', // Replace with the appropriate domain
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
});

export default signup;
