import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './views/Distribution/payment/payment.component';
import { SettingsComponent } from './views/Distribution/settings/settings.component';
import { MessageComponent } from './views/Distribution/message/message.component';
import { ProductsComponent } from './views/Distribution/products_prev/products.component';
import { BadgeorderComponent } from './views/Recruiters/badgeorder/badgeorder.component';
import { PaiementsComponent } from './views/Recruiters/paiements/paiements.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';


const routes: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule),
    // canActivate: [AuthRedirectGuard]
  },
  {
    path: 'distribution',
    loadChildren: () => import('./views/Distribution/distribution.module').then(m => m.DistributionModule),
  },
  {
    path: 'recruteurs',
    loadChildren: () => import('./views/Recruiters/recruiter.module').then(m => m.DistributionModule),
  },

  
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }