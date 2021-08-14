import { NextFunction, Request, Response } from "express";

function AuthNavMiddleware(req: Request, res: Response, next: NextFunction){
    const cookies = req.cookies;
    if(cookies && cookies._userid) res.locals.isLogin = true;
    else res.locals.isLogin = false;
    next();
}

export default AuthNavMiddleware;