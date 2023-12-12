import somethingWrongErr from "./somethingWrongErr.js";

const wrapAsync = (fn) => {
  return (req, res, next) => {
    try {
      fn(req, res, next);
    } catch (error) {
      console.log(error);
      somethingWrongErr(res);
    }
  };
};

export default wrapAsync;
