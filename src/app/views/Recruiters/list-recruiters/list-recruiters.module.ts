import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { RecruiterComponent } from './recruiter/recruiter.component';
import { ProfilComponent } from './profil/profil.component';
import { InfoComponent } from './info/info.component';
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: RecruiterComponent,
  },
  {
    path: "profil",
    component: ProfilComponent,
  },
  {
    path: "info",
    component: InfoComponent,
  },
  {
    path: "liste-recruter",
    component: RecruiterComponent,
  },
];

@NgModule({
  declarations: [
    // RecruiterComponent,
    ProfilComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    RecruiterComponent, // Import standalone component
    // ProfilComponent,    // Import standalone component
    // InfoComponent       // Import standalone component
  ]
})
export class ListRecruitersModule {}
