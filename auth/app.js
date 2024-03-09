const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const UserController=require("./controllers/user-controllers") // Assuming User.js is in the same directory

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(
  process.env.MONGO_URL,
  
)
.then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
app.use(express.json());
// Create a new user
app.post("/users", UserController.signUp);
app.get("/users/getAll", UserController.getAllUsers);
app.post("/users/login", UserController.login);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
