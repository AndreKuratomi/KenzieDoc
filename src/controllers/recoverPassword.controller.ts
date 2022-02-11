import { Request, Response } from "express";
import { RecoverPasswordService } from "../services/recoverPassword.service";
import nodemailer from "nodemailer";
import { codeGenerator } from "../utils/codeGenerator";
import { UsersRepository } from "../repositories/users.repository";
import { getCustomRepository } from "typeorm";

export class RecoverPasswordController {
  async handle(req: Request, res: Response) {
    const recoverPasswordService = new RecoverPasswordService();
    const usersRepository = getCustomRepository(UsersRepository);
    const email = req.body.email;

    const code = codeGenerator();

    try {
      const user = await recoverPasswordService.execute(email);

      user.resetCode = code;

      await usersRepository.save(user);

      var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "a70d827704c150",
          pass: "f0966f724a6254",
        },
      });

      const mailOptions = {
        from: "kenzie.market@org.com",
        to: email,
        subject: "Recover password",
        text: `Ola, ${user.name}!
        O seu codigo para recuperar a senha é: ${code}`,
      };

      transport.sendMail(mailOptions, function (err, info) {
        if (err) {
          return res.status(200).json({ message: err.message });
        } else {
          return res
            .status(200)
            .json({ message: `An e-mail has been sent to ${email}` });
        }
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
