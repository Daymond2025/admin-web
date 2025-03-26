import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProviderslistComponent } from './providerslist/providerslist.component';
import { ProviderscommandesComponent } from './providerscommandes/providerscommandes.component';
import { ProvidersproductsComponent } from './providersproducts/providersproducts.component';
import { ProviderscomptablesComponent } from './providerscomptables/providerscomptables.component';
import { ProvidersdetailsComponent } from './providersdetails/providersdetails.component';
import { AddProvidersComponent } from './add-providers/add-providers.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AddShopComponent } from './add-shop/add-shop.component';
import { AddManagerComponent } from './add-manager/add-manager.component'
import { SharedModule } from 'src/app/shared/shared.module';



const routes: Routes = [
  {
    path: '',
    component: ProviderslistComponent,
  },
  {
    path: 'commandes/:id',
    component: ProviderscommandesComponent,
  },
  {
    path: 'products/:id',
    component: ProvidersproductsComponent,
  },
  {
    path: 'comptables/:id',
    component: ProviderscomptablesComponent,
  },
  {
    path: 'details/:id',
    component: ProvidersdetailsComponent,
  },
  {
    path: 'add',
    component: AddProvidersComponent,
  },
  {
    path: 'add_shop/:id',
    component: AddShopComponent,
  },
  {
    path: 'add_manager/:id',
    component: AddManagerComponent,
  },
  
];


@NgModule({
  declarations: [
    // ProviderslistComponent,
    // ProviderscommandesComponent,
    // ProvidersproductsComponent,
    // ProviderscomptablesComponent,
    // ProvidersdetailsComponent,
    // AddProvidersComponent,
    // AddAdminComponent,
    // AddShopComponent,
    // AddManagerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ProvidersModule { }



