import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotificationsRoutingModule } from './notifications-routing.module';
// Angular Material modules nécessaires pour le component
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

// Ton formulaire de notification
import { NotificationFormComponent } from 'src/app/views/Distribution/notifications/form/notification-form/notification-form.component';

@NgModule({
  declarations: [
    NotificationsComponent,
    
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotificationsRoutingModule,
    // Dialogs
    NotificationFormComponent,
    // Material
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatSelectModule
  ],
  exports: [NotificationsComponent]
})
export class NotificationsModule {}
