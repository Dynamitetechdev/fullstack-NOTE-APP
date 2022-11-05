const asyncHandler = require("express-async-handler");

const note = require("../models/noteModel");

// @desc GET get notes
// @routes "/api/notes"
// @access private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await note.find();
  res.json(notes);
});

// @desc POST add notes
// @routes "/api/notes"
// @access private
const addNotes = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text");
  }
  const addNote = await note.create({
    text: req.body.text,
  });
  res.json(addNote);
});

// @desc PUT update notes
// @routes "/api/notes/:id"
// @access private
const updateNotes = asyncHandler(async (req, res) => {
  const updateNote = await note.findById(req.params.id);

  if (!updateNote) {
    res.status(400);
    throw new Error("note was not found");
  }

  const updatedNote = await note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updateNote);
});

// @desc DELETE delete notes
// @routes "/api/notes/:id"
// @access private
const deleteNotes = asyncHandler(async (req, res) => {
  const deleteNote = await note.findById(req.params.id);

  if (!deleteNote) {
    res.status(400);
    throw new Error("note not found");
  }

  await deleteNote.remove();
  res.json({ id: req.params.id });
});

module.exports = {
  getNotes,
  addNotes,
  updateNotes,
  deleteNotes,
};
