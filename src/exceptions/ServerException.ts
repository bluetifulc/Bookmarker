export default class ServerException extends Error{
    public status: number;
    public msg: string;
    constructor(status: number, msg: string){
        super(msg);
        this.status = status;
        this.msg = msg;
    }
}