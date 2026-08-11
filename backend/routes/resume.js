const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// GET /api/resume - Download resume PDF or redirect to Drive link
router.get("/", (req, res) => {
  try {
    const localResumePath = path.join(__dirname, "..", "assets", "resume.pdf");
    const publicResumePath = path.join(__dirname, "..", "..", "public", "resume.pdf");

    if (fs.existsSync(localResumePath)) {
      return res.download(localResumePath, "Divyansh_Thakur_Resume.pdf");
    }

    if (fs.existsSync(publicResumePath)) {
      return res.download(publicResumePath, "Divyansh_Thakur_Resume.pdf");
    }

    // Direct Google Drive link fallback
    const resumeDriveUrl = process.env.RESUME_URL || "https://drive.google.com/file/d/1OMF1EAi_bfvr4U-SinX7z33M8chxBFUf/view?usp=sharing";
    return res.redirect(307, resumeDriveUrl);
  } catch (error) {
    console.error("Express Resume Download API error:", error);
    return res.status(500).json({ error: "Failed to download resume." });
  }
});

module.exports = router;
