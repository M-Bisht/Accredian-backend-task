const enterAllDetailsErr = (res) => {
  return res.status(400).json({
    success: false,
    message: "Please fill all fields",
  });
};

export default enterAllDetailsErr;