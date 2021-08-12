import User from "../models/User";
import UserDTO from "../DTO/UserDTO";
import DuplicatedUsernameException from "../exceptions/DuplicatedUsernameException";

class UserService{
    private user = User;
    public async register(data: UserDTO){
        if(await this.user.findOne({username: data.username})){
            throw new DuplicatedUsernameException(data.username);
        }
        await this.user.create(data);

    }
}

export default UserService;