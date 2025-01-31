import { Component } from '@angular/core';

@Component({
  selector: 'app-list-announcements',
  standalone: true, // Important
  templateUrl: './list-announcements.component.html',
  styleUrls: ['./list-announcements.component.css']
})
export class ListAnnouncementsComponent {
  activeTab: string = 'premier-tab'; // Onglet actif par défaut

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }
}
