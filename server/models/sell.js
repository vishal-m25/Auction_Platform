const mongoose = require("mongoose");

const sellitemSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  ProductName: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  DateTime: {
    type: Date,
    required: true,
  },
  processed: {
    type: Boolean,
    default: false, // Indicates whether emails have been sent
  },
});

const product = mongoose.model("ProductDetails", sellitemSchema);

module.exports = product;
