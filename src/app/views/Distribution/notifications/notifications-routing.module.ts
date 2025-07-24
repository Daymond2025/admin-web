import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsComponent } from './notifications.component';
import { NotificationFormComponent } from './form/notification-form/notification-form.component';

const routes: Routes = [
  { path: '', component: NotificationsComponent },
  { path: 'nouveau', component: NotificationFormComponent }, // 👉 redirection vers le formulaire
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {}
