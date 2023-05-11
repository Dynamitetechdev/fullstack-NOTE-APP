const express = require("express");
const {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
} = require("../controller/goalController");
const { protectRoute } = require("../middleware/authMiddleWare");
const dotenv = require("dotenv").config();
const router = express.Router();

// The Reason we are not specify the routes here is because, we are specifying it at the server.js file

// Requests
// 1. GET 2. POST 3. PUT/PATCH:id (update) 4. DELETE:id

router.route("/").get(protectRoute, getGoals).post(protectRoute, setGoals);
router
  .route("/:id")
  .put(protectRoute, updateGoal)
  .delete(protectRoute, deleteGoal);

module.exports = router;
