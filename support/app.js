const express = require("express");
const mongoose = require("mongoose");
const dotenv=require("dotenv");

const SupportController = require("./support-controller");
dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
app.use(express.json());
// Create a new user
app.post("/support", SupportController.createSupport);
app.get("/support/getAll", SupportController.getAll);
// app.post("/users/login", UserController.login);

// Start the server
const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
