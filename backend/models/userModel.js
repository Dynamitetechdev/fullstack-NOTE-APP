const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Add the name field"],
    },
    email: {
      type: String,
      required: [true, "Add mail field"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Add Password  field"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
