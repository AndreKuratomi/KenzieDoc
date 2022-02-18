import { Request, Response } from "express";
import { createMail, sendPrescription } from "../services/email.service";


export class SendEmailController {
    async handle(req: Request, res: Response) {

        const data = req.body;

        try {
            await createMail(data)
            return res.json( {"Status":"Email successfully sent!"})
        } catch (error) {
            console.log(error)
        }
    }
}

export class SendPrescriptionEmailController {
    async handle(req: any, res: Response) {
        
        
        const data = req.body
        const attachments = req.file
        attachments.filename = req.file.originalname
        
        try {
            await sendPrescription(data.user, data.medic, data.email, data.specialty, attachments)
            return res.json( {"Status":"Email successfully sent!"})
        } catch (error) {
            console.log(error)
        }
    }
}
