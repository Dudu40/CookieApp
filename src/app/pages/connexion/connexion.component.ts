import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  connexionForm!: FormGroup;
  succes : boolean;
  constructor(private fb : FormBuilder,
              public authService :  AuthService,
              private router : Router)
  {
    this.succes=true;
  }

  ngOnInit(): void {
    this.connexionForm = this.fb.group({
      pseudo: ['', Validators.required],
      mdp: ['',Validators.required],
      });
  }

  onSubmit() : void {
    let profil = new User(this.connexionForm.get('pseudo')!.value,this.connexionForm.get('mdp')!.value);
    this.succes=this.authService.connexion(profil);
    console.log("succes",this.succes);
  }

}
