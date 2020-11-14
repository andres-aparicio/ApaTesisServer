import jwt from 'jsonwebtoken';

export default class Token{
    private static semilla: string = 'semilla-speed,privacidadYPropia-Andres';
    private static caducidad: string = '1h';

    constructor(){}

    static getToken(payload: any): string{
        return jwt.sign({
            usuario: payload
        }, this.semilla, {expiresIn: this.caducidad});
    }

    static comprobarToken (userToken: string){
        return new Promise ((resolve, rejeact)=>{
            jwt.verify(userToken,this.semilla,(err, decoded)=>{
                if(err){
                    rejeact();
                } else{
                    resolve(decoded);
                }
            });
        });
    }
}