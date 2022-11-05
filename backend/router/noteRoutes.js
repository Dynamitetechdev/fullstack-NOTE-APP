const express = require("express");
const router = express.Router();

const {
  getNotes,
  addNotes,
  updateNotes,
  deleteNotes,
} = require("../noteFunctionController/controller");

router.get("/", getNotes);
router.post("/", addNotes);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);
module.exports = router;
