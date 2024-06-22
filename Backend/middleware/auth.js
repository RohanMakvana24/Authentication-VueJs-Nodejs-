import jwt from "jsonwebtoken";

//Authenticate User By the Token
export const is_Auth = async (req, res, next) => {
  const authheader = req.headers["authorization"];
  const token = authheader;
  console.log(token);
  if (token == null) {
    return res.status(404).send({
      success: false,
      message: "Token is required ",
    });
  }

  jwt.verify(token, process.env.JWTSECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(404).send({
        success: false,
        message: err,
      });
    }
    req.user = user;
    next();
  });
};
