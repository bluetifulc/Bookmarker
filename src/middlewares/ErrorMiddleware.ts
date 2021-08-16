import { NextFunction, Request, Response } from "express";
import ServerException from "../exceptions/ServerException";

function errorMiddleware(error: ServerException, req: Request, res: Response, next: NextFunction){
    const status = error.status || 500;
    const msg = error.msg || 'Something gone wrong';
    res.render('home/error', {
        msg: msg,
        status: status,
    });
}

export default errorMiddleware;