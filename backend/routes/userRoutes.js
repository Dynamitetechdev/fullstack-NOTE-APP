const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controller/userController");
const { protectRoute } = require("../middleware/authMiddleWare");

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protectRoute, getMe);

module.exports = router;
