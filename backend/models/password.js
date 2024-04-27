import mongoose from "mongoose";

const schema = new mongoose.Schema({
  site: {
    type: String,
    requirde: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  showPassword: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Password = mongoose.model("Password", schema);
