const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  try {
    // Parse the body of the POST request
    const email = JSON.parse(event.body);

    // Basic input validation
    if (!email) {
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
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    let mailOptions = {
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: `New newsletter submission!`,
      text: `You have a new subscriber from your website newsletter.\n\nEmail: ${email}\n\n`,
    };

    // Send the email
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
