import * as express from 'express';
import User from '../models/User';
import Controller from './Controller';
import UserService from '../services/UserService';

class UserController implements Controller{
    public mainPath: string = '/user';
    public router: express.Router = express.Router();
    private user = User;
    private userService = new UserService();
    
    constructor(){
        this.router.get('/', this.getHome);
        this.router.get('/signup', this.getSignUp);
        this.router.post('/', this.postHome.bind(this));
    }

    private getHome(req: express.Request, res: express.Response){
        res.redirect("/");
    }
    
    private getSignUp(req: express.Request, res: express.Response){
        res.render('user/signup');
    }
    
    private async postHome(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log(req.body);
        try{
            await this.userService.register(req.body);
        }catch(error){
            next(error);
        }
    }
}

export default UserController;