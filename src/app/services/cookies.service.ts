import { HttpClient } from '@angular/common/http';
import { Injectable, resolveForwardRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cookie } from 'src/models/cookie';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  cookies : Cookie[];
  constructor(private http : HttpClient) { 
    this.cookies=[];
    this.getCookies();
  }

  deleteCookie(id:number){
    return this.http.post(environment.SERVEUR_URL+"deleteCookie",{id:id});
  }

  addFavorite(id:number){
    return this.http.post(environment.SERVEUR_URL+"addFavorite",{idCookie:id,idUser:parseInt(localStorage.getItem("currentUserId")!)});
  }

  removeFavorite(id:number){
    return this.http.post(environment.SERVEUR_URL+"removeFavorite",{idCookie:id,idUser:parseInt(localStorage.getItem("currentUserId")!)});
  }

  getCookies(){
    return this.http.get(environment.SERVEUR_URL+'cookies');
  }
  
}
