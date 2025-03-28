const mongoose = require("mongoose");

const BidSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productDetails", // Assuming 'ProductDetails' is your product model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
  },

  email: {
    type: String,

    unique: true,
  },

  price: {
    type: Number,
  },
});

const bid = mongoose.model("BidPrices", BidSchema);

module.exports = bid;
