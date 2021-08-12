import mongoose, { mongo, Mongoose, Schema } from 'mongoose';
import { HashedPassword, cryptoModel } from '../crypto';
interface VirtualUserSchema extends mongoose.Schema{
    _confirmationPassword: string,
}
interface VirtualUserDocument extends mongoose.Document{
    username: string,
    password: string,
    salt: string,
    nickname: string,
    _confirmationPassword: string,
}

let userSchema:mongoose.Schema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Require user name!'],
        trim: true,
        unique: true
    },
    password:{
        type:String,
        required: [true, 'Require password!'],
        selected: false
    },
    salt:{
        type:String,
        required: true,
        selected: false
    },
    nickname:{
        type:String,
        required: [true, "Required nicknam"],
        trim: true
    },
},{
    toObject: {virtuals: true}
});

userSchema.virtual('confirmationPassword')
    .get(function(this:VirtualUserSchema){
        return this._confirmationPassword; 
    })
    .set(function(this:VirtualUserSchema, confirmationPassword:string){
        this._confirmationPassword = confirmationPassword;
    }
);

userSchema.pre('save', async function(this:VirtualUserDocument,next){
    let user = this;
    if(!user.isModified('password')) return next();
    const passwordAndSalt:HashedPassword = await cryptoModel.getPasswordAndSalt(user.password);
    user.password = passwordAndSalt.password;
    user.salt = passwordAndSalt.salt;
    console.log("LOGLOGLOG: ",passwordAndSalt);
    return next();
});

userSchema.path('password').validate(function(this:VirtualUserDocument){
    let user = this;
    if(user.isNew){
        if(!user._confirmationPassword){
            user.invalidate('confirmationPassword', 'Confirmation Password is required.');
        }else if(user.password !== user._confirmationPassword){
            user.invalidate('confirmationPassword', 'Confirmation Password does NOT matched.');
        }
    }else{

    }
});

let User = mongoose.model('user', userSchema);
export default User;
export {VirtualUserDocument, VirtualUserSchema};