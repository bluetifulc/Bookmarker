import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import configJSON from '../config.json';
import User from '../models/User';
import TokenInterface from '../interfaces/TokenInterface';
import WrongAuthException from "../exceptions/WrongAuthException";

async function AuthMiddleware(req: Request, res: Response, next: NextFunction){
    const cookies = req.cookies;
    if(cookies && cookies._userid){
        try{
            const verifiedToken = await jwt.verify(cookies._userid, configJSON.JWT_SECRET_KET) as TokenInterface;
            const id = verifiedToken._id;
            const user = await User.findById(id);
            if(user){
                req.user = user;
                next();
            }else{
                next(new WrongAuthException());
            }
        }catch(error){
            next(new WrongAuthException());
        }
    }else{
        next(new WrongAuthException());
    }
}

export default AuthMiddleware;