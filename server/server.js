require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: ["https://yourfrontend.com"], methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

// MongoDB Connection
const db = process.env.MONGO_URI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const authroutes = require("./routes/auth");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authroutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Server is connected");
});

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("Closing MongoDB connection...");
  await mongoose.connection.close();
  process.exit(0);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
