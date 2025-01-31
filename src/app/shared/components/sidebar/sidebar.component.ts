import { Component, Input, OnChanges } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnChanges{
  @Input()
  currentRoute!: string;

  ngOnChanges() {

    if (this.currentRoute === '/dashboard') {

    } else if (this.currentRoute === '/profile') {
      
    }

  }
}
