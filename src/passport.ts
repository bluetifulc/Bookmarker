import { CallbackError } from "mongoose";
import passport from "passport";
import passportLocal from "passport-local";
import User, {VirtualUserDocument} from "./models/User";


passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id:string, done)=>{
    User.findOne({_id:id}, (err:CallbackError, user:VirtualUserDocument)=>{
        done(err,user);
    })
})

passport.use('local-login', 
    new passportLocal.Strategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, (req,username,password,done)=>{
        User.findOne({username:username})
            .select({password:1})
            .exec((err:CallbackError, user)=>{
                if(err) return done(err);
                if(user && user.authenticate(password)){
                    return done(null,user);
                }else{
                    return done(null, false);
                }
            });
    })
);