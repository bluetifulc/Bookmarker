import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import configJSON from "./config.json";
import Controller from "./controllers/Controller";
import errorMiddleware from "./middlewares/ErrorMiddleware";

class App{
    public app: express.Application;
    constructor(controllers: Controller[]){
        this.app = express();
        this.connectDB();
        this.intializeMiddlewares();
        this.intializeControllers(controllers);
        this.initializeErrorHandler();
    }
    public listen(){
        this.app.listen(configJSON.PORT, ()=>{
            console.log(`Application is runnin... http://localhost:${configJSON.PORT}`);
        })
    }
    private connectDB(){
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
        mongoose.connect(configJSON.DB_URL);
        const db = mongoose.connection;
        db.once('open', ()=>{
            console.log('DB connect !');
        });
        db.on('error', (err)=>{
            console.log('DB error!: ', err);
        });
    }
    private intializeMiddlewares(){
        this.app.set('view engine', 'ejs');
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(session({secret:configJSON.SESSION_SECRET_KEY, resave: false, saveUninitialized: true}));
    }
    private intializeControllers(controllers: Controller[]){
        controllers.forEach((controller)=>{
            this.app.use(controller.mainPath, controller.router);
        });
    }
    private initializeErrorHandler(){
        this.app.use(errorMiddleware);
    }
};

export default App;