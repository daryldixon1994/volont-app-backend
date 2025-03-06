// xdqd ylxx tfyk btfv

// sjfs hwie bkck dlgo
const nodemailer = require("nodemailer");
require("dotenv").config();
module.exports = (userEmail, fullName, id) => {
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
      subject: "Please verify your account", // Subject line
      html: `Hello ${fullName} and welcome to VOLONTAPP
      Please visit this <a href="https://bettertogetherr.netlify.app/verify-email/${id}" target="_blank" >link</a> to verify your account
      `, // plain text body
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);
};
