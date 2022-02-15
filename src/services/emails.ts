import nodemailer from "nodemailer";
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";
import path from "path";

// let transport = nodemailer.createTransport({
//   host: localhost,
//   port: port,
//   auth: {
//     user: user,
//     pass: password,
//   },
// });

export const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3b91e5798f98f0",
    pass: "490150d50aa310",
  },
});

const handlebarOptions: NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    partialsDir: path.resolve(__dirname, "..", "templates"),
    defaultLayout: undefined,
  },
  viewPath: path.resolve(__dirname, "..", "templates"),
};

transport.use("compile", hbs(handlebarOptions));

// const mailOptions = {
//   from: "andremail@kenziedoc.com",
//   to: "andrekuratomi@gmail.com",
//   subject: "Node mailer",
//   text: "Hello word!",
// };

export const mailOptions = (
  to: string[],
  subject: string,
  template: string,
  context: any
) => {
  return {
    from: "kenziedoc@kenziedoc.com.br",
    to,
    subject,
    template,
    context,
  };
};

// transport.sendMail(mailOptions, function (err, info) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Message enviada: " + info.response);
//   }
// });
