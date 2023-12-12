import wrapAsync from "../../helpers/errors/wrapAsync.js";

const logout = wrapAsync((req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login or signup first.",
    });
  }

  res.cookie("token", token, {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export default logout;
