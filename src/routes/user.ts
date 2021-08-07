import express from 'express';
import User from "../models/User";

let router = express.Router();

router.get('/', (req,res) => {
    res.redirect("/");
});

router.get('/signup', (req,res) => {
    res.render('user/signup');
});

router.post('/', (req,res) => {
    console.log(req.body);
    User.create(req.body, (err, user) => {
        if(err){
            console.log("error", err);
            return res.json(err);
        }else{
            res.redirect('/');
        }
    });
});

export default router;