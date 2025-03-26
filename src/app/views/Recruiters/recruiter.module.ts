import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";


const routes: Routes = [
    {
        path:"",
        loadChildren: () => import('./list-recruiters/list-recruiters.module').then(m => m.ListRecruitersModule),
    },
    // {
    //     path: 'recruteurs',
    //     loadChildren: () => import('./list-recruiters/list-recruiters.module').then(m => m.ListRecruitersModule),
    
    //   },
      {
        path: 'annonces',
        loadChildren: () => import('./annoncements-recruiter/annoncements-recruiter.module').then(m => m.AnnoncementsRecruiterModule),
    
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