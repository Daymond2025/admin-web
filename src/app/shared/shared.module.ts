import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
// import { ImageDialogComponent } from "./components/image-dialog/image-dialog.component";
// import { ProgressBarComponent } from "./components/progress-bar/progress-bar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
// import { PhoneFormatPipe } from "./pipes/phone-format.pipe";
// import { TruncatePipe } from "./pipes/truncate.pipe";

const components = [
  HeaderComponent,
  SidebarComponent,
//   TruncatePipe,
//   PhoneFormatPipe,
//   ProgressBarComponent,
];

const modules = [
  CommonModule,
  RouterModule,
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule,
  MatDialogModule,
  SidebarComponent
];

@NgModule({
  declarations: [
    HeaderComponent,
    
]
,
  imports: [...modules, CommonModule, MatDialogModule],
  exports: [...components, ...modules],
  providers: [],
})
export class SharedModule {}
