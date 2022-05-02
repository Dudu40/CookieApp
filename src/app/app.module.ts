import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './structure/menu/menu.component';
import { FooterComponent } from './structure/footer/footer.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { CookiesComponent } from './pages/cookies/cookies.component';
import { CookiesAdminComponent } from './admin/cookies-admin/cookies-admin.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import {MatIconModule} from '@angular/material/icon'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatDialogModule} from '@angular/material/dialog';
import { AjouterCookieComponent } from './pages/cookies/ajouter-cookie/ajouter-cookie.component';
import { InfoCookieComponent } from './pages/cookies/info-cookie/info-cookie.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { PaiementComponent } from './pages/shop/paiement/paiement.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    ConnexionComponent,
    AccueilComponent,
    CookiesComponent,
    CookiesAdminComponent,
    InscriptionComponent,
    AjouterCookieComponent,
    ShopComponent,
    InfoCookieComponent,
    ProfilComponent,
    PaiementComponent
  ],
  entryComponents:[AjouterCookieComponent,InfoCookieComponent,PaiementComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
