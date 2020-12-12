const nodemailer = require("nodemailer");
const mailConfig = require("../config/mail");

class Mail {
  constructor() {
    const { auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: auth.user,
        pass: auth.pass,
      },
    });
  }

  sendMail(message) {
    return this.transporter.sendMail(
      {
        ...mailConfig.default,
        ...message,
      },
      (err, info) => {
        console.log(err || info);
      }
    );
  }
}

module.exports = new Mail();
