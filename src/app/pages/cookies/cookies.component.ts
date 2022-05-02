import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { CookiesService } from 'src/app/services/cookies.service';
import { Cookie } from 'src/models/cookie';
import { AjouterCookieComponent } from './ajouter-cookie/ajouter-cookie.component';
import { InfoCookieComponent } from './info-cookie/info-cookie.component';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent implements OnInit {
  cookiesList : Cookie[];
  succesAddCookie : boolean = false;
  interval : any;
  constructor(public authService:AuthService,
              public dialog: MatDialog,
              public cookiesService: CookiesService) 
  { 
    this.cookiesList=[];
  }

  ngOnInit(): void {
    this.getCookies();
    this.interval = setInterval(() => { 
      this.getCookies(); 
  }, 1000);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AjouterCookieComponent,
      {width: '60%'});

    dialogRef.afterClosed().subscribe(res => {
      if (res==true){
        confirm("Le cookie a été ajouté avec succès");
      }
    });
  }

  deleteCookie(cookie : Cookie){
    var res = confirm("Êtes-vous sûr de vouloir supprimer ce cookie?");
    if(res){
         this.cookiesService.deleteCookie(cookie.id).subscribe(
      res=>{
        if(res){
          this.getCookies();
        }
        
      });
    }
  }

  changeFavorite(cookie : Cookie){
    if (!this.currentIdUserInArray(cookie)){
      this.cookiesService.addFavorite(cookie.id).subscribe(
        res=>{
          console.log("cookie ajouté aux favoris",res);
          this.getCookies();
      });
    }
    else{
      this.cookiesService.removeFavorite(cookie.id).subscribe(
        res=>{
          console.log("cookie supprimé des favoris",res);
          this.getCookies();
      });
    }
  }

  getCookies(){
   this.cookiesService.getCookies().subscribe((
    res=>{
      let object:any=res;
      this.cookiesList=object;
      console.log("cookies",this.cookiesList);
    }));;  
  }

  openInfo(cookie:any){
   this.dialog.open(InfoCookieComponent, {
      data:cookie,
      panelClass: 'dialog-info'
    });
  }

  currentIdUserInArray(cookie : Cookie) : boolean{
   if (cookie.likeByList){
     return cookie.likeByList.includes(parseInt(localStorage.getItem("currentUserId")!));
    }
    else{
      return false;
    }
  }
}
