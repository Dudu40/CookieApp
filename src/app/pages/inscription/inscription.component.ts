import { trigger } from '@angular/animations';
import { HttpBackend, HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  inscriptionForm! : FormGroup;
  succes : boolean;
  pseudoPris : boolean;
  constructor(private fb : FormBuilder,
              private http : HttpClient)
  {
    this.succes=false;
    this.pseudoPris=false;
  }

  ngOnInit(): void {
    this.inscriptionForm = this.fb.group({
      pseudo: ['', Validators.required],
      mdp: ['',Validators.required],
      mdp2 : ['',Validators.required]
      });
  }

  get mdpEgaux(){
    let mdp1 = this.inscriptionForm.get("mdp")!.value;
    let mdp2 = this.inscriptionForm.get("mdp2")!.value;
    return mdp1==mdp2;
  }

  isValid() : boolean {
    return this.mdpEgaux && this.inscriptionForm.valid
  }
  onSubmit(){

    let newProfil ={pseudo:this.inscriptionForm.get("pseudo")!.value,mdp:this.inscriptionForm.get("mdp")!.value,isAdmin:false}
    this.http.post(environment.SERVEUR_URL+'addProfil',newProfil,{responseType: "text"}).subscribe(
      res =>{
        console.log("res",res);
        if (res=="success"){
          this.succes=true;
        }
        else if (res="pseudoPris"){
          this.pseudoPris=true;
        }
        else{
          this.succes=false;
        }
      }
    )

  }

}
