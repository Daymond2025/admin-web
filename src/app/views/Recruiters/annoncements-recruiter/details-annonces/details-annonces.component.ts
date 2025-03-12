import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SlidesService } from 'src/app/shared/services/Slides.service';
import { UtilisService } from 'src/app/shared/services/Utilis.service';

@Component({
  selector: 'app-details-annonces',
  standalone: true,
  templateUrl: './details-annonces.component.html',
  styleUrls: ['./details-annonces.component.css'],
  imports:[CommonModule ,ReactiveFormsModule,
      FormsModule, ]
})
export class DetailsAnnoncesComponent {

 

}
