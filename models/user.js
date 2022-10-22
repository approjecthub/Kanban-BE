const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "firstName is required"],
    validate: {
      validator: (v) => {
        return (v.length > 0) & (v.length <= 30);
      },
      message: () => "firstName should not have more than 30 characters",
    },
  },
  lastName: {
    type: String,
    required: [true, "lastName is required"],
    validate: {
      validator: (v) => {
        return (v.length > 0) & (v.length <= 30);
      },
      message: () => "lastName should not have more than 30 characters",
    },
  },
  email: {
    type: String,
    required: [true, "email is required"],
    validate: {
      validator: (v) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("user", userSchema);
