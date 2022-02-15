import { Request, Response, NextFunction } from "express";
import { CreatePatientService, PatientsListService, UpdatePatientService, DeletePatientService } from "../services/patient.service"
    
export const create = async (req: Request, res: Response, next: NextFunction) => {
  const createPatientService = new CreatePatientService()

  try {
    const patient = await createPatientService.execute(req.body);

    return res.status(201).send(patient);
  } catch (err) {
    return res.status(400).send({message: "E-mail already registered"});
  }   
}

export const list = async (req: Request, res: Response) => {
  const listPatientService = new PatientsListService()

  const patient = await listPatientService.execute();

  return res.send(patient);
}

export const updating = async (req: Request, res: Response, next: NextFunction) => {
  const updatePatientService = new UpdatePatientService()

  try {
    const { id } = req.params;

    const updatedUser = await updatePatientService.execute(id, req.body);

    return res.send(updatedUser);
  } catch (error) {
    next(error)
  }    
}

export const deleting = async (req: Request, res: Response, next: NextFunction) => {
  const deletePatientService = new DeletePatientService()
  
  try {
    const { id } = req.params;

    await deletePatientService.execute(id);

    return res.sendStatus(204);
  } catch (error) {
    next(error)
  }
}
