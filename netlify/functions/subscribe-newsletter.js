const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  try {
    // Parse the request body
    const { email } = JSON.parse(event.body);

    // Basic input validation
    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Email address is required.",
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
      to: process.env.TO_EMAIL, // Or save to a database instead of sending emails
      subject: "New Newsletter Subscription",
      text: `You have a new subscriber!\n\nEmail: ${email}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Thank you for subscribing to our newsletter!",
      }),
    };
  } catch (error) {
    console.error("Error processing subscription:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message:
          "There was an error processing your subscription. Please try again later.",
      }),
    };
  }
};
