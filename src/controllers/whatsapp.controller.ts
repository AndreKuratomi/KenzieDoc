import { Request, Response } from "express";
import { createWhats } from "../services/whatsapp.service";


export class SendWhatsappController {
    async handle(req: Request, res: Response) {

        const data = req.body;

        try {
            await createWhats(data)
            return res.json( {"Status":"Whatsapp successfully sent!"})
        } catch (error) {
            console.log(error)
        }
    }
}