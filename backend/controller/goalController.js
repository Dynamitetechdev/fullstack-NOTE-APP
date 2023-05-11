const expressAsyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");
// @desc     Get Goals
// @route    GET | 'api/goals'
// @access   PRIVATE
const getGoals = expressAsyncHandler(async (req, res) => {
  const goals = await Goal.find({
    user: req.user.id,
  });
  res.status(200).json(goals);
});

//Continue from trying to delete another users goal

// @desc     Set Goals
// @route    POST | 'api/goals'
// @access   PRIVATE
const setGoals = expressAsyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please Enter a Message");
  }
  const goals = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  console.log(req.body);
  res.status(200).json(goals);
});

// @desc     update Goal
// @route    PUT | 'api/goals/:id'
// @access   PRIVATE
const updateGoal = expressAsyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("goal not found");
  }

  // Get The user with the User model using the ID of the user
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("No User Found");
  }
  // match the logged In user to the goal owner using Id's
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// @desc     Delete Goals
// @route    DELETE | 'api/goals/:id'
// @access   PRIVATE
const deleteGoal = expressAsyncHandler(async (req, res) => {
  const goal = await Goal.findByIdAndDelete(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal Not Found");
  }

  // get the user
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("No User Found");
  }

  // Match logged in user id, with the goal's owner id
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("Not authorized");
  } else {
    await goal.remove();
  }

  res.status(200).json({ message: req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
};
