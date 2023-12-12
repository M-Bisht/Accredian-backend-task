const somethingWrongErr = (res) => {
  return res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
};

export default somethingWrongErr;
