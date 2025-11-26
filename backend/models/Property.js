const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  city: String,
  address: String,
  type: String,
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  images: [
    {
      url: String,
      public_id: String
    }
  ]
});

module.exports = mongoose.model("Property", propertySchema);
