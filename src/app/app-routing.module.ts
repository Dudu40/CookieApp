import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { CookiesComponent } from './pages/cookies/cookies.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { ShopComponent } from './pages/shop/shop.component';

const routes: Routes = [
  {path:'', component:AccueilComponent},
  {path:'connexion', component:ConnexionComponent},
  {path:'inscription', component:InscriptionComponent},
  {path:'accueil', component:AccueilComponent},
  {path:'cookies', component:CookiesComponent},
  {path:'shop', component:ShopComponent},
  {path:'profil', component:ProfilComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
