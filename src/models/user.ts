import { Cookie } from "./cookie";

export class User {
    pseudo : string;
    mdp : string;
    isAdmin:boolean;
    cookies : Cookie[]

    constructor(pseudo : string,mdp:string){
        this.pseudo=pseudo;
        this.mdp=mdp;
        this.isAdmin=false;
        this.cookies=[];
    }
    
}