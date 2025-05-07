import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandManagementRoutingModule } from './brand-management-routing.module';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandFormComponent } from './brand-form/brand-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [BrandListComponent, BrandFormComponent],
  imports: [
    CommonModule,
    BrandManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class BrandManagementModule {}
