import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { ProductsComponent } from "./products_prev/products.component";

const routes: Routes = [
    {
        path:"",
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
    },
      {
        path: 'orders',
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
    
      },
      {
          path: 'produits',
          component: ProductsComponent,
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