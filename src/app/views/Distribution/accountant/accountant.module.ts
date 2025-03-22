import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotsolderComponent } from './notsolder/notsolder.component';
import { SolderComponent } from './solder/solder.component';
import { RechargeComponent } from './recharge/recharge.component';

const routes: Routes = [
  {
    path: '',
    component: NotsolderComponent,
  },
  {
    path: 'solde',
    component: SolderComponent,
  },
  {
    path: 'recharge',
    component: RechargeComponent,
  },
  
 
];

@NgModule({
  declarations: [
    // NotsolderComponent,
    // SolderComponent,
    // RechargeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountantModule { }
