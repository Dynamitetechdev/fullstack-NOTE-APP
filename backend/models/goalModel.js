const { default: mongoose } = require("mongoose");

// Create a blueprint for what our API will entail, and adding timestamps to keep track on newly updated data, create a updatedAt and CreatedAt variable automatically
const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      require: [true, "Please add a text"],
    },
  },
  {
    timestamps: true,
  }
);

// Exporting With mongoose schema, containing the name of the schema and the schema function
module.exports = mongoose.model("Goal", goalSchema);
