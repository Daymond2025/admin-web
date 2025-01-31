import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AnnoncesComponent } from './annonces/annonces.component';
import { DetailsAnnoncesComponent } from './details-annonces/details-annonces.component';
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: AnnoncesComponent,
  },
  {
    path: "liste",
    component: AnnoncesComponent,
  },
  {
    path: "detail",
    component: DetailsAnnoncesComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    AnnoncesComponent,           // Import standalone component
    DetailsAnnoncesComponent,    // Import standalone component
  ]
})
export class AnnoncementsRecruiterModule {}
