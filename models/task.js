const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    validate: {
      validator: (v) => {
        return v.length > 0 && v.length <= 200;
      },
      message: () => "title should not have more than 200 characters",
    },
  },
  description: {
    type: String,
    validate: {
      validator: (v) => {
        return v.length <= 500;
      },
      message: () => "title should not have more than 500 characters",
    },
  },
  status: {
    type: String,
    enum: ["todo", "doing", "done"],
    required: [true, "status is required"],
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "board",
    required: [true, "board is required"],
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "task",
    default: null,
  },
});

module.exports = mongoose.model("task", taskSchema);
