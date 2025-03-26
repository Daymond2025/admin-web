import { Component, Input, OnChanges } from '@angular/core';
import { Router , Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';

import { menu } from 'src/assets/config/constant';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone:true,
})
export class SidebarComponent implements OnChanges{
  @Input()
  currentRoute!: string;
  menu:any
  menuDroite:any
  urlActuelle:any
  pathActuel:any
  itemSelectionne:any
  constructor(private router: Router){}

  ngOnInit() {
    this.menu=menu
    console.log("menu=",this.menu)
    this.router.events.subscribe((event: Event) => {
    if (event instanceof NavigationStart) {
      // console.log(event.url.split('/'));
    this.urlActuelle=event.url
    console.log(this.urlActuelle)
   
    console.log("menu droite ",this.menuDroite)
    localStorage.setItem('pathActuel',this.urlActuelle.split('/')[this.urlActuelle.split('/').length - 2])
    localStorage.setItem('itemSelectionne',this.urlActuelle.split('/')[this.urlActuelle.split('/').length - 1])
    console.log("actu =",this.urlActuelle.split('/'))
    if(this.urlActuelle.split('/').length>=2){
      this.pathActuel=this.urlActuelle.split('/')[1]
      console.log("actuel = ",this.pathActuel)
    }
    else{
      this.pathActuel=localStorage.getItem('pathActuel')
    }
    this.menuDroite=this.menu.find((e:any)=>e.routerLink=="/"+this.pathActuel)
    this.itemSelectionne=localStorage.getItem('itemSelectionne')
    }
    if (event instanceof NavigationEnd) {
      console.log(this.urlActuelle)
      console.log(event.url);this.urlActuelle=event.url
      
      console.log("menu droite ",this.menuDroite)
      localStorage.setItem('pathActuel',this.urlActuelle.split('/')[this.urlActuelle.split('/').length - 2])
      localStorage.setItem('itemSelectionne',this.urlActuelle.split('/')[this.urlActuelle.split('/').length - 1])
      console.log("actu =",this.urlActuelle.split('/'))
      if(this.urlActuelle.split('/').length>=2){
        this.pathActuel=this.urlActuelle.split('/')[1]
        console.log("actuel = ",this.pathActuel)
      }
      else{
        this.pathActuel=localStorage.getItem('pathActuel')
      }
      this.menuDroite=this.menu.find((e:any)=>e.routerLink=="/"+this.pathActuel)
      this.itemSelectionne=localStorage.getItem('itemSelectionne')
    }
    if (event instanceof NavigationError) {console.log(event.error);}
  })
  }

  ngOnChanges() {

    if (this.currentRoute === '/dashboard') {

    } else if (this.currentRoute === '/profile') {
      
    }

  }
}
