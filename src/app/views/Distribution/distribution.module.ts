import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { ProductsComponent } from "./products_prev/products.component";
import { PaymentComponent } from "./payment/payment.component";
import { SettingsComponent } from "./settings/settings.component";

const routes: Routes = [
    {
        path:"",
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
    },
      {
        path: 'commandes',
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
    
      },
    {
      path: 'produits',
      loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),

    },
    {
      path: 'paiements',
      component: PaymentComponent,
    },
    {
      path: 'reglages',
      component: SettingsComponent,
    },
    {
      path: 'utilisateurs',
      loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  
    },
    {
      path: 'annonces',
      loadChildren: () => import('./announcements/announcements.module').then(m => m.AnnouncementsModule),
  
    },
    {
      path: 'comptabilite',
      loadChildren: () => import('./accountant/accountant.module').then(m => m.AccountantModule),
      // canActivate: [AuthGuard]
    },
    {
      path: 'fournisseurs',
      loadChildren: () => import('./providers/providers.module').then(m => m.ProvidersModule),
      // canActivate: [AuthGuard]
    },
    {
      path: 'marques',
      loadChildren: () =>  import('./brand-management/brand-management.module').then(m => m.BrandManagementModule),
    },
    {
      path: 'couleurs',
      loadChildren: () => import('./color-management/color-management.module').then(m => m.ColorManagementModule),
    },
];

@NgModule({
  declarations: [], // Pas besoin de déclarer les composants standalone ici
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    // sCallListComponent, // Imported standalone component
    // sCordListComponent, // Imported standalone component
    // CordDetailComponent, // Imported standalone component
  ],
})
export class DistributionModule {}