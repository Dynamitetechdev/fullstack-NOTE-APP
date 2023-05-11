const JWT = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protectRoute = expressAsyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      // get only the token from "Bearer se7fhkjdhgukjdghjkdg"
      token = authHeader.split(" ")[1];

      //Decoding or Verifying token using JWT.VERIFY and with the JWT_SECRET
      const decode = JWT.verify(token, process.env.JWT_SECRET);
      //   console.log(decode);

      // assigning user id to req.user, the ID was signed with JWT
      req.user = await User.findById(decode.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(400);
    throw new Error("Not authorized, No Token");
  }
});

module.exports = { protectRoute };
