/* eslint-disable no-console */
import nodemailer from 'nodemailer';

function sendEmail(email, id) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Account Verification',
    html: `<p>Please verify your account before you can use it Click <a href='${process.env.HOST}/api/v1/users/activate/${id}'>Link<a/></p>`,
  };
  const emailAddr = process.env.EMAIL;
  const pass = process.env.PASS;
  const transport = nodemailer.createTransport({ service: 'gmail', auth: { user: emailAddr, pass } });
  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}

export default sendEmail;
