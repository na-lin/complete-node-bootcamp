const nodemailer = require('nodemailer');

// function to send email, passing in email, subject line ,or other stuff
const sendEmail = async options => {
  // 1) Create a transporter
  // add option for service that nodemailer not support
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Jonas Schmedtmann <hello@jonas.io>', //where email is coming from
    to: options.email, // recipient address
    subject: options.subject,
    text: options.message
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
