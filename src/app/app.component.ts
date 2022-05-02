import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { StatutService } from './services/statut.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  implements OnInit{
  title : string;
  isConnected : boolean = false;
  user! : string;
  constructor(public authService : AuthService) {
    this.title = 'cookiesApp';

   }
  ngOnInit(): void {
  }

}
