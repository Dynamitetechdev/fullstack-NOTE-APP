const { default: mongoose } = require("mongoose");

// Create a blueprint for what our API will entail, and adding timestamps to keep track on newly updated data, create a updatedAt and CreatedAt variable automatically

// Associating a schema to each owner, we need to add the a user field, which it
// Type is an ID
// required is true
// reference to the User schema
const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
