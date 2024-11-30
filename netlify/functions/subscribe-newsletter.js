const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  try {
    console.log("Function started");
    const { email } = JSON.parse(event.body);
    console.log("Parsed email:", email);

    if (!email) {
      console.log("Validation failed: Missing email");
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Please provide a valid email address.",
        }),
      };
    }

    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS_2,
      },
    });
    console.log("Transporter created");

    let mailOptions = {
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: `New newsletter submission!`,
      text: `You have a new subscriber: ${email}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Subscription successful!",
      }),
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "An error occurred. Please try again later.",
      }),
    };
  }
};
