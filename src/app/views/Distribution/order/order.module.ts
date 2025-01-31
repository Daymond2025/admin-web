import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { sCallListComponent } from './call-list/call-list.component'; // Standalone component
import { sCordListComponent } from './cord-list/cord-list.component'; // Standalone component
import { CordDetailComponent } from './cord-detail/cord-detail.component'; // Standalone component
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: sCallListComponent, // Standalone component
  },
  {
    path: "list_call",
    component: sCallListComponent, // Standalone component
  },
  {
    path: "list_cord",
    component: sCordListComponent, // Standalone component
  },
  {
    path: "details_coord",
    component: CordDetailComponent, // Standalone component
  },
];

@NgModule({
  declarations: [], // Pas besoin de déclarer les composants standalone ici
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    sCallListComponent, // Imported standalone component
    sCordListComponent, // Imported standalone component
    CordDetailComponent, // Imported standalone component
  ],
})
export class OrderModule {}
