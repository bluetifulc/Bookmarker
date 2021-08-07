import crypto, { createPrivateKey, Hash } from "crypto";
import { resolveInclude } from "ejs";

interface HashedPassword{
    password:string,
    salt:string
}

function createSalt(): Promise<string>{
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err,buf)=>{
            if(err) reject(err);
            resolve(buf.toString('base64'));
        });
    });
}
function getPasswordAndSalt(password: string): Promise<HashedPassword>{
    return new Promise(async (resolve, reject)=>{
        const salt = await createSalt();
        let result:string="NULL";
        crypto.pbkdf2(password, salt, 10007, 64, 'sha512', (err,buf)=>{
            if(err) reject(err);
            resolve({
                password: buf.toString('base64'),
                salt: salt
            });
        });
    });
}