const nodemailer = require("nodemailer");

exports.send = async function (mailOptions) {
  let mailerConfig = {
    host: "smtp.mail.eu-west-1.awsapps.com",
    secureConnection: true,
    port: 465,
    auth: {
      user: process.env.SMTPLogin,
      pass: process.env.SMTPPass,
    },
  };

  let transporter = nodemailer.createTransport(mailerConfig);

  mailOptions.from = mailerConfig.auth.user;

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
