import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Importation des composants utilisés dans le routage
import { PaymentComponent } from './views/Distribution/payment/payment.component';
import { SettingsComponent } from './views/Distribution/settings/settings.component';
import { MessageComponent } from './views/Distribution/message/message.component';
import { ProductsComponent } from './views/Distribution/products_prev/products.component';
import { BadgeorderComponent } from './views/Recruiters/badgeorder/badgeorder.component';
import { PaiementsComponent } from './views/Recruiters/paiements/paiements.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

// Définition des routes de l'application
const routes: Routes = [
  {
    path: 'dashboard', // URL pour accéder au tableau de bord
    component: DashboardComponent, // Composant affiché pour cette route
    // canActivate: [AuthGuard] // Garde de route commentée pour protéger l'accès
  },
  {
    path: 'auth', // Route pour le module d'authentification
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule), // Chargement paresseux du module Auth
    // canActivate: [AuthRedirectGuard] // Garde de route commentée pour redirection
  },
  {
    path: 'distribution', // Route pour le module de distribution
    loadChildren: () => import('./views/Distribution/distribution.module').then(m => m.DistributionModule), // Chargement paresseux du module Distribution
  },
  {
    path: 'recruteurs', // Route pour le module des recruteurs
    loadChildren: () => import('./views/Recruiters/recruiter.module').then(m => m.DistributionModule), // Chargement paresseux, mais semble contenir une erreur (DistributionModule au lieu de RecruiterModule)
  },
  {
    path: '', // Route par défaut (racine de l'application)
    redirectTo: 'auth', // Redirige vers la route 'auth'
    pathMatch: 'full' // Assure que la redirection s'applique uniquement à l'URL vide
  },
  {
    path: '**', // Route de capture pour toutes les URL non correspondantes
    redirectTo: '' // Redirige vers la route par défaut (racine)
  },
];

// Décorateur NgModule pour configurer le module de routage
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Initialise le routage avec les routes définies
  exports: [RouterModule] // Exporte RouterModule pour qu'il soit disponible dans l'application
})
export class AppRoutingModule { }