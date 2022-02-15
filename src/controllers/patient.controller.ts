import { Request, Response } from "express";
import { 
  CreatePatientService, 
  PatientsListService, 
  UpdatePatientService, 
  DeletePatientService 
} from "../services/patient.service"
  
export class CreatePatientController {
  async handle(req: Request, res: Response) {

    const createPatientService = new CreatePatientService()
    const data = req.body;

    try {
      const patient = await createPatientService.execute(data);

      const { password: data_password, ...dataWithoutPassword } = patient;

      return res.status(201).json(dataWithoutPassword);      
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }   
  }
}

export class PatientsListController {
  async handle(req: Request, res: Response) {
    const listPatientService = new PatientsListService()

    try{
      const patient = await listPatientService.execute();

      let listWithoutPassword = []
      let eachPatient = {}

      for (let i in patient){
        eachPatient = {
            cpf: patient[i].cpf,
            name: patient[i].name,
            age: patient[i].age,
            sex: patient[i].sex,
            email: patient[i].email,
            phone: patient[i].phone,
            health_plan: patient[i].health_plan
        }
        listWithoutPassword.push(eachPatient)
      }   

      return res.json(listWithoutPassword);
    } catch (err:any) {
      return res.status(400).json({ message: err.message });
    }
  }
}

export class UpdatePatientController {
  async handle(req: Request, res: Response) {
    const updatePatientService = new UpdatePatientService()

    try {
      const { cpf } = req.params;

      const updatedPatient = await updatePatientService.execute(cpf, req.body);

      const { password: data_password, ...dataWithoutPassword } = updatedPatient;

      return res.status(201).json(dataWithoutPassword);

    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }    
  }
}

export class DeletePatientController {
  async handle(req: Request, res: Response) {
    const deletePatientService = new DeletePatientService()
    
    try {
      const { cpf } = req.params;

      await deletePatientService.execute(cpf);

      return res.sendStatus(204);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}
