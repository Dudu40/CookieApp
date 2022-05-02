import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatutService implements OnInit {
  isConnected : boolean;
  isAdmin : boolean;
  token : unknown;
  userStr : any;
  constructor() {
    this.isConnected=false;
    this.isAdmin=false;
    this.token='basicToken';
   }
  ngOnInit(): void {

  }

  getUser() :any{
    return localStorage.getItem("curentUserId");
  } 

}
