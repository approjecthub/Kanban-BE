const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    validate: {
      validator: (v) => {
        return v.length > 0 && v.length <= 30;
      },
      message: () => "name should not have more than 30 characters",
    },
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "creator is required"]
  },
});

module.exports = mongoose.model("board", boardSchema);
