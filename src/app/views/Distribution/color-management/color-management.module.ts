import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorListComponent } from './color-list/color-list.component';
import { ColorFormComponent } from './color-form/color-form.component';
import { ColorManagementRoutingModule } from './color-management-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ColorListComponent,
    ColorFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ColorManagementRoutingModule
  ]
})
export class ColorManagementModule {}
