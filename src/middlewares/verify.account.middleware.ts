import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/user.repositories";
import  ErrorHandler from "../errors/application.error";

const verifyAccount = async (req: any, res: Response, next: NextFunction) => {
    const userInfo = req.user;
    const { uuid } = req.params;
  
    const userRepository = getCustomRepository(UserRepository);
    console.log(uuid);
  
    const user = await userRepository.findOne({
      where: {
        id: uuid,
      },
    });
  
    if (userInfo.id !== uuid && userInfo.isAdm === false) {
      throw new ErrorHandler("Missing admin permissions", 401);
    }
  
    return next();
};

export default verifyAccount