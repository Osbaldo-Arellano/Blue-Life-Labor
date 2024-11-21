const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  // Parse the request body
  const { name, email, message } = JSON.parse(event.body);

  // Basic input validation
  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Please fill out all required fields.",
      }),
    };
  }

  // Set up Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: "Gmail", // You can use other email services
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
  });

  // Email options
  let mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_USER, // Your receiving email
    subject: `New contact form submission from ${name}`,
    text: `You have a new message from your website contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Your message has been sent successfully!",
      }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message:
          "There was an error sending your message. Please try again later.",
      }),
    };
  }
};
