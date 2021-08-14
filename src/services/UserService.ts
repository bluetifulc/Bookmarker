import User from "../models/User";
import UserDTO from "../DTO/UserDTO";
import DuplicatedUsernameException from "../exceptions/DuplicatedUsernameException";
import cryptoModel from "../crypto";
import * as jwt from "jsonwebtoken";
import configJSON from "../config.json";
import UserInterface from "../interfaces/UserInterface";
import LoginDTO from "../DTO/LoginDTO";
import WrongCredentialException from "../exceptions/WrongCredentialException";
import TokenInterface from "../interfaces/TokenInterface";

class UserService{
    private user = User;
    public async register(data: UserDTO){
        if(await this.user.findOne({username: data.username})){
            throw new DuplicatedUsernameException(data.username);
        }
        await this.user.create(data);
    }
    public async login(data: LoginDTO): Promise<string>{
        const userdata = await this.user.findOne({username:data.username})
        if(!userdata) throw new WrongCredentialException();
        const hashedPassword = await cryptoModel.getPasswordUsingSalt(data.password, userdata.salt);
        if(hashedPassword !== userdata.password) throw 'error';
        const token = await jwt.sign({ _id: userdata._id }, configJSON.JWT_SECRET_KET, { expiresIn: '1m'});
        return token;
    }
}

export default UserService;