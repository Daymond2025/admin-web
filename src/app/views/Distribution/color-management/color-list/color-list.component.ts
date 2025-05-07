import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/shared/services/color.service';
import { Color } from 'src/app/shared/models/color.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html'
})
export class ColorListComponent implements OnInit {
  colors: Color[] = [];

  constructor(private colorService: ColorService, private router: Router) {}

  ngOnInit() {
    this.loadColors();
  }

  loadColors() {
    this.colorService.getColors().subscribe(data => this.colors = data);
  }

  deleteColor(id: number) {
    if (confirm('Supprimer cette couleur ?')) {
      this.colorService.deleteColor(id).subscribe(() => this.loadColors());
    }
  }

  editColor(id: number) {
    this.router.navigate(['/distribution/couleurs/edit', id]);
  }
}
