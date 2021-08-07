import express from "express";
import mongoose from "mongoose";
import configJSON from "./config.json";
import userRouter from "./routes/user";

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(configJSON.DB_URL);

let app:express.Express = express();
let db = mongoose.connection;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


db.once('open', ()=>{
    console.log('DB connect !');
});
db.on('error', (err)=>{
    console.log('DB error!: ', err);
});
app.get('/', (req:express.Request, res:express.Response)=>{
    res.render("home/index");
})
app.use('/user', userRouter);


const port = 8080;
app.listen(port, () => {
    console.log("Server on! http://localhost:"+port);
});