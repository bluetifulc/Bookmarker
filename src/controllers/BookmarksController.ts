import * as express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import Controller from './Controller';

class BookmarksController implements Controller{
    public mainPath: string = '/bookmarks';
    public router: express.Router = express.Router();
    constructor(){
        this.router.get('/',AuthMiddleware ,this.getIndex);
    }

    private getIndex(req: express.Request, res: express.Response){
        res.render('bookmarks/index');
    }
}

export default BookmarksController;