// xdqd ylxx tfyk btfv

// sjfs hwie bkck dlgo
const nodemailer = require("nodemailer");
require("dotenv").config();
module.exports = (userEmail, fullName) => {
  const GMCEMAIL = process.env.GMCEMAIL;
  const GMCPWD = process.env.GMCPWD;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    // SENDER EMAIL AND PASSWORD
    auth: {
      user: GMCEMAIL,
      pass: GMCPWD,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    const info = await transporter.sendMail({
      from: `"VOLONTAPP" <${GMCEMAIL}>`, // sender address
      to: userEmail,
      subject: "Great news! Account is activated", // Subject line
      html: `Hello ${fullName} and welcome to VOLONTAPP
      We are thrilled to annouce that your account is now activated 🥳.
      <a href="http://localhost:5000">Join now!</a>
      `, // plain text body
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);
};
