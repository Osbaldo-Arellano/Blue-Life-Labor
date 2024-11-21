// server.js

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("assets")); // Serve static files (HTML, CSS, JS, etc.)
app.use(express.static(".")); // Serve static files (HTML, CSS, JS, etc.)

// Route to handle contact form submission
app.post("/send-mail", async (req, res) => {
  const { name, email, message } = req.body;

  // Basic input validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please fill out all required fields.",
    });
  }

  // Set up Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: "Gmail", // You can use other services like Yahoo, Outlook, etc.
    auth: {
      user: process.env.EMAIL_USER, // Your email address (from .env)
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
  });

  console.log(transporter);

  // Email options
  let mailOptions = {
    from: `"${name}" <${email}>`, // Sender address
    to: process.env.EMAIL_USER, // Your receiving email address
    subject: `New contact form submission from ${name}`,
    text: `You have a new message from your website contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message:
        "There was an error sending your message. Please try again later.",
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
