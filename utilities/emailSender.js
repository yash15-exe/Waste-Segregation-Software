//import dotenv from "dotenv";
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORDEMAIL,
  },
});

async function emailSender(receiver, subject, text) {
  const info = await transporter.sendMail({
    from: "testyash306@gmail.com",
    to: receiver,
    subject: subject,
    text: text,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = emailSender;
