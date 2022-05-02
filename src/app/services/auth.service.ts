import { HttpClient } from '@angular/common/http';
import { templateJitUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user';
import { StatutService } from './statut.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token! : string;
  public isConnected : boolean =false;
  public isAdmin : boolean = false
  constructor(private router : Router,
              private http: HttpClient,) { }

  // on check si le profil existe dans la liste des utilisateurs dans un fichier json et on renvoit un token si c'est le cas
  connexion(profil : User):boolean{
    let url ='../assets/data/profils/'+profil.pseudo+'@'+profil.mdp+'.json';
    let succes = false;
    let object : any ={};
    this.http.post(environment.SERVEUR_URL+'login',profil).subscribe(
      res => {
        object=res;
        if (object!==null){
          this.isAdmin=object.isAdmin;
          this.token=object.token;
          this.isConnected=true;
          localStorage.setItem('currentUserId', JSON.stringify(object.id));
          localStorage.setItem('isLogin', String(this.isConnected));
          this.router.navigate(['/accueil']);
          succes= true;
        }
        else{
          succes=false;
        }
      }
    );
    return succes;
  }

  deconnexion(){
    this.isConnected=false;
    this.isAdmin=false;
    this.token='';
    localStorage.removeItem("currentUserId");
    localStorage.removeItem('IsLogin');
  }
}
