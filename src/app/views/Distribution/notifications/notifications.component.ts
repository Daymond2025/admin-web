import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotificationService } from 'src/app/shared/services/notification.service';
import { Notification } from 'src/app/shared/models/notification.model';
import { NotificationFormComponent } from 'src/app/views/Distribution/notifications/form/notification-form/notification-form.component';

interface PaginatedNotifications {
  current_page: number;
  data: Notification[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'audience', 'status', 'sentAt', 'actions'];
  dataSource: MatTableDataSource<Notification> = new MatTableDataSource();

  countSent = 0;
  countScheduled = 0;

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
      next: (response: PaginatedNotifications) => {
        // On récupère le tableau de notifications dans response.data
        this.dataSource.data = response.data;

        // Assigner paginator et sort
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // Mise à jour des compteurs
        this.countSent = response.data.filter(n => n.is_sent).length;
        this.countScheduled = response.data.filter(n => !n.is_sent && !!n.send_at).length;

        console.log('📊 Envoyées:', this.countSent, ' | Programmées:', this.countScheduled);
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
    console.log('👀 Voir notification', notification);
    // TODO : afficher les détails dans un dialog ou une sidebar
  }

  onSendNow(notification: Notification): void {
    this.notificationService.sendNow(notification.id).subscribe({
      next: () => {
        this.snackBar.open('Notification envoyée', 'Fermer', { duration: 3000 });
        this.loadNotifications();
      },
      error: (err) => {
        console.error('Erreur lors de l’envoi', err);
        this.snackBar.open('Erreur lors de l’envoi', 'Fermer', { duration: 3000 });
      }
    });
  }

  onDelete(notification: Notification): void {
    if (confirm('Supprimer cette notification ?')) {
      this.notificationService.deleteNotification(notification.id).subscribe({
        next: () => {
          this.snackBar.open('Notification supprimée', 'Fermer', { duration: 3000 });
          this.loadNotifications();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
          this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000 });
        }
      });
    }
  }
}
