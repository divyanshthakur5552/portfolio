const express = require("express");
const cors = require("cors");
require("dotenv").config();

const contactRouter = require("./routes/contact");
const resumeRouter = require("./routes/resume");
const spotifyRouter = require("./routes/spotify");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend requests
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Backend API Routes
app.use("/api/contact", contactRouter);
app.use("/api/resume", resumeRouter);
app.use("/api/spotify", spotifyRouter);

// Health Check Route
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "Portfolio Backend Server is running smoothly!",
    endpoints: {
      contact: "POST /api/contact",
      resume: "GET /api/resume",
    },
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 Portfolio Backend Server running on http://localhost:${PORT}`);
  console.log(`=================================`);
});
