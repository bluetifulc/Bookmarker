import ServerException from "./ServerException";

export default class WrongCredentialException extends ServerException{
    constructor(){
        super(400, "The account with that username and password doen NOT exist");
    }
}