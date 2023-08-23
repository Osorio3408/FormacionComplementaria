const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",

  auth: {
    user: "senacursoscomplentarios2@gmail.com",
    pass: "hluqxmwjuoisirsl",
  },
});

module.exports = transporter;
