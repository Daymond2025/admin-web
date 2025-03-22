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
  // {
  //   path: '',
  //   loadChildren: () => import('./views/Distribution/order/order.module').then(m => m.OrderModule),

  // },
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
    path: 'orders',
    loadChildren: () => import('./views/Distribution/order/order.module').then(m => m.OrderModule),

  },
  {
    path: 'paiemennt',
    component: PaymentComponent,
  },
  {
    path: 'reglage',
    component: SettingsComponent,
  },
  {
    path: 'produits',
    loadChildren: () => import('./views/Distribution/products/products.module').then(m => m.ProductsModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./views/Distribution/users/users.module').then(m => m.UsersModule),

  },
  {
    path: 'annonces',
    loadChildren: () => import('./views/Distribution/announcements/announcements.module').then(m => m.AnnouncementsModule),

  },
  {
    path: 'recruteur',
    loadChildren: () => import('./views/Recruiters/list-recruiters/list-recruiters.module').then(m => m.ListRecruitersModule),

  },
  {
    path: 'announce-recruteur',
    loadChildren: () => import('./views/Recruiters/annoncements-recruiter/annoncements-recruiter.module').then(m => m.AnnoncementsRecruiterModule),

  },
  {
    path: 'accountant',
    loadChildren: () => import('./views/Distribution/accountant/accountant.module').then(m => m.AccountantModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'providers',
    loadChildren: () => import('./views/Distribution/providers/providers.module').then(m => m.ProvidersModule),
    // canActivate: [AuthGuard]
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