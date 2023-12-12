import wrapAsync from "../../helpers/errors/wrapAsync.js";

const userDetails = wrapAsync((req, res) => {
  const user = req.user;
  return res.status(200).json({
    success: true,
    message: user,
  });
});

export default userDetails;
