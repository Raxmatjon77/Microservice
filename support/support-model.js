const mongoose = require("mongoose");

// Define user schema
const supportSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,

  },
  topic: {
    type: String,
    required: true,
   
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export User model
const Support = mongoose.model("Support", supportSchema);

module.exports = Support;
