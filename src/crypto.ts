import crypto, { createPrivateKey, Hash } from "crypto";

interface HashedPassword{
    password:string,
    salt:string
}
const cryptoModel = {
    createSalt: function(): Promise<string>{
        return new Promise((resolve, reject) => {
            crypto.randomBytes(64, (err,buf)=>{
                if(err) reject(err);
                resolve(buf.toString('base64'));
            });
        });
    },

    getPasswordAndSalt: function(password: string): Promise<HashedPassword>{
        return new Promise(async (resolve, reject)=>{
            const salt = await cryptoModel.createSalt();
            let result:string="NULL";
            crypto.pbkdf2(password, salt, 10007, 64, 'sha512', (err,buf)=>{
                if(err) reject(err);
                resolve({
                    password: buf.toString('base64'),
                    salt: salt
                });
            });
        });
    },

    getPasswordUsingSalt: async function(password: string, salt: string){
        const hashedPassword = await crypto.pbkdf2Sync(password,salt,10007,64,'sha512').toString('base64');
        return hashedPassword;
    }
}

export default cryptoModel;
export {HashedPassword, cryptoModel};