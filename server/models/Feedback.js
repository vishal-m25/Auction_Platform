const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
});

const feedbacks = mongoose.model("Feedbacks",feedbackSchema);

module.exports = feedbacks;