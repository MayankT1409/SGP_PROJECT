

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, token) => {
  // const verificationLink = `http://localhost:5000/api/auth/verify/${token}`;
  const verificationLink = `https://sgp-project-1.onrender.com/api/auth/verify/${token}`;


  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Email - HeritageConnect',
    html: `
      <h2>Welcome to HeritageConnect</h2>
      <p>Click the link below to verify your email:</p>
      <a href="${verificationLink}" target="_blank">Verify Email</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Verification email sent to', email);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
};

module.exports = sendVerificationEmail;
