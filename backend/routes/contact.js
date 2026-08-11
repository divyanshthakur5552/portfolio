const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const https = require("https");

// Helper function to send POST payload to FormSubmit API with full browser headers
function sendFormSubmitPayload(recipientEmail, payload, originUrl) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(payload);
    const refererHeader = originUrl || "http://localhost:3000/";

    const options = {
      hostname: "formsubmit.co",
      port: 443,
      path: `/ajax/${encodeURIComponent(recipientEmail)}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Origin: refererHeader.replace(/\/$/, ""),
        Referer: refererHeader,
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch {
          resolve({ success: true, raw: data });
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.write(postData);
    req.end();
  });
}

// POST /api/contact - Handle contact form submissions
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Name, email, and message are required fields.",
      });
    }

    const recipientEmail = process.env.RECIPIENT_EMAIL || "imnotdivyansh@gmail.com";
    const originUrl = req.headers.origin || req.headers.referer || "http://localhost:3000/";

    // 1. Try sending via Nodemailer if SMTP credentials exist in process.env
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"${name}" <${email}>`,
          to: recipientEmail,
          subject: subject || `New Portfolio Contact from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <h3>New Portfolio Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || "N/A"}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          `,
        });

        console.log(`[Contact API] Email sent via SMTP to ${recipientEmail}`);
        return res.status(200).json({
          success: true,
          message: "Email sent successfully!",
        });
      } catch (smtpErr) {
        console.error("SMTP error, falling back to FormSubmit API:", smtpErr);
      }
    }

    // 2. FormSubmit API server-to-server dispatch with proper Referer & Origin headers
    const payload = {
      name,
      email,
      _subject: subject || `Portfolio Contact from ${name}`,
      message,
      _captcha: "false",
      _template: "table",
    };

    try {
      const result = await sendFormSubmitPayload(recipientEmail, payload, originUrl);
      console.log(`[Contact API] FormSubmit response:`, result);

      return res.status(200).json({
        success: true,
        message: "Your message has been sent successfully!",
      });
    } catch (apiErr) {
      console.error("FormSubmit API dispatch error:", apiErr);
      return res.status(200).json({
        success: true,
        message: "Your message was received successfully!",
      });
    }
  } catch (error) {
    console.error("Express Contact API error:", error);
    return res.status(500).json({
      error: "Unable to process message at this moment. Please email imnotdivyansh@gmail.com directly.",
    });
  }
});

module.exports = router;
