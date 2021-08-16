import * as express from 'express';
import User from '../models/User';
import Controller from './Controller';
import UserService from '../services/UserService';
import LoginDTO from '../DTO/LoginDTO';
import WrongCredentialException from '../exceptions/WrongCredentialException';
import AuthMiddleware from '../middlewares/AuthMiddleware';

class UserController implements Controller{
    public mainPath: string = '/user';
    public router: express.Router = express.Router();
    private user = User;
    private userService = new UserService();
    
    constructor(){
        this.router.get('/', this.getHome);
        this.router.get('/signup', this.getSignUp);
        this.router.get('/login', this.getLogin);
        this.router.get('/logout', AuthMiddleware, this.getLogout);
        this.router.get('/account', AuthMiddleware, this.getAccount);
        this.router.post('/', this.postHome.bind(this));
        this.router.post('/login', this.postLogin.bind(this));
    }

    private getHome(req: express.Request, res: express.Response){
        res.redirect("/");
    }
    
    private getSignUp(req: express.Request, res: express.Response){
        res.render('user/signup');
    }

    private getLogin(req: express.Request, res: express.Response){
        res.render('user/login');
    }

    private getLogout(req: express.Request, res: express.Response){
        res.cookie("_userid", "", {maxAge:0});
        res.redirect("/");
    }

    private getAccount(req: express.Request, res: express.Response){
        res.render('user/account');
    }
    
    private async postHome(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log(req.body);
        try{
            await this.userService.register(req.body);
        }catch(error){
            next(error);
        }
    }

    private async postLogin(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log(req.body);
        const data: LoginDTO = req.body;
        try{
            const token = await this.userService.login(data);
            res.cookie("_userid", token, { maxAge: 60*1000, httpOnly: true });
            res.redirect('/');
        }catch(error){
            next(error);
        }
    }
}

export default UserController;