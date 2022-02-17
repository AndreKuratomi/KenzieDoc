import nodemailer from 'nodemailer'
import hbs, {NodemailerExpressHandlebarsOptions} from 'nodemailer-express-handlebars'
import ErrorHandler from '../utils/errors'
import path from 'path';
import { getRepository } from 'typeorm';
import { Patient, Professional } from '../entities';

interface EmailBody {
    to: string;
    subject: string;
    text: string;
}

export const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "fd74675a5cf82b",
      pass: "b256e96e5d2d12"
    }
  });

  export const mailOptions = (to: string, subject: string, text: string) => {
    return {
        from: 'no-reply@kenziedoc.com',
        to,
        subject,
        text,
    }
};

export const mailTemplateOptions = (to: string, subject: string, template: string, context: any) => {
    return {
        from: 'no-reply@kenziedoc.com',
        to,
        subject,
        template,
        context
    };
}

export const createMail = (body: EmailBody) => {

    const {to, subject, text} = body;
    
    const email = mailOptions(to, subject, text);

    console.log(email)

    transport.sendMail(email, function (err, info) {
        if (err) {
            // throw new ErrorHandler('Falha ao enviar o email', 500);
            console.log(err)
        } else {
            console.log(info);
        }
    });
    return email
}

export const sendAppointmentEmail = async (user: string, medic: string, email: string, specialty: string, date: string, hour: string) => {

    const subject = "Marcação de consulta"

    const handlebarOption: NodemailerExpressHandlebarsOptions = {
            viewEngine: {
                partialsDir: path.resolve(__dirname, '..', 'templates'),
                defaultLayout: undefined
            },
            viewPath: path.resolve(__dirname, '..', 'templates')
        }
        
        transport.use('compile', hbs(handlebarOption));

        const message = mailTemplateOptions(
            email,
            subject,
            'appointment',
            {
                user,
                medic,
                specialty,
                date,
                hour,
            }
            )
            transport.sendMail(message, function (err, info) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log(info);
                }
            });
        }

        export const sendCancelationEmail = async (user: string, medic: string, email: string, specialty: string, date: string) => {

            const subject = "Cancelamento de consulta"
        
            const handlebarOption: NodemailerExpressHandlebarsOptions = {
                    viewEngine: {
                        partialsDir: path.resolve(__dirname, '..', 'templates'),
                        defaultLayout: undefined
                    },
                    viewPath: path.resolve(__dirname, '..', 'templates')
                }
                
                transport.use('compile', hbs(handlebarOption));

                const message = mailTemplateOptions(
                    email,
                    subject,
                    'cancel.appointment',
                    {
                        user,
                        medic,
                        specialty,
                        date,
                        }
                    )
                    
                    transport.sendMail(message, function (err, info) {
                        if (err) {
                            return console.log(err);
                        } else {
                            console.log(info);
                        }
                    });
                }