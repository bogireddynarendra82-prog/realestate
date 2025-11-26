const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["buyer", "seller"], default: "buyer" },
  saved: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }]
});

module.exports = mongoose.model("User", userSchema);
