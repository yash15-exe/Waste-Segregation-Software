import dotenv from "dotenv"
import nodemailer from "nodemailer";

dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export default async function emailSender(receiver, text) {
 
  const info = await transporter.sendMail({
    from: "testyash306@gmail.com",
    to: receiver,
    subject: "EMAIL FROM JUNK MACHINE", 
    text: text,
  });

  console.log("Message sent: %s", info.messageId);
}

try {
  emailSender();
} catch (error) {
  console.log(error);
}


