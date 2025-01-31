import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
// import { SharedModule } from './shared/shared.module';
// import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";
// import { HeaderComponent } from "./shared/components/header/header.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})

export class AppComponent implements OnInit{
  title="app"
  currentRoute: string;

  constructor(private router: Router) {
    // Initialiser la route courante
    this.currentRoute = this.router.url;
  }

  ngOnInit() {
    // Écouter les changements de route
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

}

