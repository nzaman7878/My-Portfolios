const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // If credentials are not provided, gracefully log the email instead of crashing
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('\n--- EMAIL NOT SENT (Missing Credentials) ---');
    console.warn(`To: ${options.to}`);
    console.warn(`Subject: ${options.subject}`);
    console.warn(`Message:\n${options.text}`);
    console.warn('--------------------------------------------\n');
    console.warn('To enable real emails, add EMAIL_USER and EMAIL_PASS to backend/.env\n');
    return;
  }

  // Create transporter (assuming Gmail for simplicity, but can be changed)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `Portfolio Contact Form <${process.env.EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text, // fallback
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
