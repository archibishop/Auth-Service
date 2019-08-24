/* eslint-disable no-console */
import nodemailer from 'nodemailer';

function sendEmail(mailOptions) {
  const email = process.env.EMAIL;
  const pass = process.env.PASS;
  const transport = nodemailer.createTransport({ service: 'gmail', auth: { user: email, pass } });
  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}

export default sendEmail;
