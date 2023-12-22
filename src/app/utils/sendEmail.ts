import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'hasansaikat74@gmail.com',
      pass: 'ukfn nxdb amgo ryiq',
    },
  });

  await transporter.sendMail({
    from: 'hasansaikat74@gamil.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within 10 mins ✔', // Subject line
    text: 'Reset your password within 10 mins, // plain text body',
    html, // html body
  });
};
