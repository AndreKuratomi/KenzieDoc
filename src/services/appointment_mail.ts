import nodemailer from "nodemailer";
import path from "path";
import hbs from "nodemailer-express-handlebars";

export const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3b91e5798f98f0",
    pass: "490150d50aa310",
  },
});

const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("../views/templates/email.handlebars"),
    defaultLayout: false,
  },
  viewPath: path.resolve("../views/templates/email.handlebars"),
};

transporter.use("compile", hbs(handlebarOptions));

const mailOptions = {
  from: '"KenzieDocs"',
  to: "andrekuratomi@gmail.com",
  subject: `Novo agendamento de consulta`,
  template: "email",
  context: {
    date: "",
    name: "André",
    company: "KenzieDoc",
  },
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    return console.log(error);
  }
  console.log("Message enviada: " + info.response);
});
