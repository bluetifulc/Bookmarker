import * as express from 'express';
import Controller from './Controller';

class HomeController implements Controller{
    public mainPath: string = '/';
    public router: express.Router = express.Router();
    constructor(){
        this.router.get('/', this.getIndex);
        this.router.get('/about', this.getAbout);
    }

    private getIndex(req: express.Request, res: express.Response){
        res.render('home/index');
    }
    private getAbout(req: express.Request, res: express.Response){
        res.render('home/about');
    }
}

export default HomeController;