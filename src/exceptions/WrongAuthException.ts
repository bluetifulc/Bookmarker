import ServerException from "./ServerException";

export default class WrongAuthException extends ServerException{
    constructor(){
        super(400, 'You should login first');
    }
}