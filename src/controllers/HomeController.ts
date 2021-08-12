import * as express from 'express';
import Controller from './Controller';

class HomeController implements Controller{
    public mainPath: string = '/';
    public router: express.Router = express.Router();
    constructor(){
        this.router.get('/', this.getIndex);
    }

    private getIndex(req: express.Request, res: express.Response){
        res.render('home/index');
    }
}

export default HomeController;