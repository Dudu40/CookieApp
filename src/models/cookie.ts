
export class Cookie {
    id : number;
    nom :string;
    image : string;
    desc: string;
    prix : number;
    isFavorite : boolean;
    likeByList : number[] = [];
    DeleteByList : number[] = [];

    constructor(id:number,nom:string,image:string,desc:string,prix:number)
    {
        this.id=id;
        this.nom=nom;
        this.image=image;
        this.desc=desc;
        this.prix=prix;
        this.isFavorite=false;
        

    }
    
}