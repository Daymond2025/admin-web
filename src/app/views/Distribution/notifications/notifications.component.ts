import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service'; // adapte le chemin si besoin
import { Notification } from 'src/app/shared/models/notification.model'; // on crée ce modèle juste après
import { NotificationFormComponent } from 'src/app/views/Distribution/notifications/form/notification-form/notification-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']

  
})
export class NotificationsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'audience', 'status', 'sentAt',  'actions'];
  dataSource: MatTableDataSource<Notification> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getAllNotifications().subscribe({
      next: (notifications) => {
        this.dataSource.data = notifications;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des notifications', err);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openNewNotificationModal(): void {
    const dialogRef = this.dialog.open(NotificationFormComponent, {
      width: '600px',
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.loadNotifications();
      }
    });
  }

  onView(notification: Notification): void {
    // TODO: afficher les détails dans une boîte de dialogue ou une sidebar
    console.log('👀 Voir notification', notification);
  }

  onSendNow(notification: Notification): void {
    this.notificationService.sendNow(notification.id).subscribe({
      next: () => {
        console.log('✅ Notification envoyée');
        this.loadNotifications();
      },
      error: (err) => {
        console.error('❌ Erreur lors de l’envoi', err);
      }
    });
  }

  onDelete(notification: Notification): void {
    if (confirm('Supprimer cette notification ?')) {
      this.notificationService.deleteNotification(notification.id).subscribe({
        next: () => {
          console.log('🗑️ Notification supprimée');
          this.loadNotifications();
        },
        error: (err) => {
          console.error('❌ Erreur lors de la suppression', err);
        }
      });
    }
  }
}
