import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog} from '@angular/material/dialog';
import { PaiementComponent } from './paiement/paiement.component';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  shopList : any;
  interval : any;
  idUser!: number;
  constructor(private http:HttpClient,public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.idUser=parseInt(localStorage.getItem("currentUserId")!);
    this.getShopById(this.idUser);
    this.interval = setInterval(() => { 
      this.getShopById(this.idUser); 
  }, 1000);
  }

  getShopById(idUser:any){
    let param= idUser.toString();
    let parametres = {id:idUser}
    this.http.post(environment.SERVEUR_URL+"shopById",parametres).subscribe(res=>{
      this.shopList=res;
    })
  
  }
  removeFromFavorite(id : number){
    var res = confirm("Êtes-vous sûr de vouloir supprimer cet article ?");
    if(res){
      let param = {id : id}
      this.http.post(environment.SERVEUR_URL+"deleteFromFavorite",param).subscribe(res=>{
        if(res){
          this.ngOnInit();
        }
        
      })
    }
  }

  confirmerCommande(){
    let total = 0;
    this.shopList.forEach((x : any)=> {
      total+=x.prix;  
    });
    console.log("total",total);
    const dialogRef = this.dialog.open(PaiementComponent,{data:total});
    dialogRef.afterClosed().subscribe(res => {
      if (res==true){
        confirm("Merci pour votre commande");
        let param = {id:this.idUser}
        this.http.post(environment.SERVEUR_URL+"resetFavorite",param).subscribe(res=>{
          if(res){
            this.ngOnInit();
          }
          
        })
      }
    });
  }

}