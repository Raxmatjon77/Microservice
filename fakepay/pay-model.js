const mongoose = require("mongoose");

// Define user schema
const paySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  
  },
  expireMonth: {
    type: String,
    required: true,
 
  },
  cardNumber: {
    type: String,
    required: true,
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export User model
const Payment = mongoose.model("Payment", paySchema);

module.exports =  Payment;
