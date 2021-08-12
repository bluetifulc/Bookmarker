import ServerException from "./ServerException";

export default class DuplicatedUsernameException extends ServerException{
    constructor(username: String){
        super(400, `Username "${username}" is already exist.`);
    }
}