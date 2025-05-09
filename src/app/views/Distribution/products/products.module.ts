import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewComponent } from './new/new.component';
import { DetailComponent } from './detail/detail.component';
import { AddComponent } from './add/add.component';
import { PublishComponent } from './publish/publish.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: NewComponent,
  },

  {
    path: 'detail/:id',
    component: DetailComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  },
  {
    path: 'publish/:id',
    component: PublishComponent,
  },
  {
    path: 'delete/:id',
    component: NewComponent,
  },
];

@NgModule({
  declarations: [
    // NewComponent,
    // DetailComponent,
    // AddComponent,
    // PublishComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),

  ]
})
export class ProductsModule { }
