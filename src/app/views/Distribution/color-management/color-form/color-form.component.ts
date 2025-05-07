import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorService } from 'src/app/shared/services/color.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-color-form',
  templateUrl: './color-form.component.html'
})
export class ColorFormComponent implements OnInit {
  colorForm!: FormGroup;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private colorService: ColorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.colorForm = this.fb.group({
      name: ['', Validators.required],
      code: ['#000000', Validators.required] // Couleur par défaut
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.colorService.getColor(this.id).subscribe(color => {
        this.colorForm.patchValue(color);
      });
    }
  }

  submit() {
    if (this.colorForm.invalid) return;

    const color = this.colorForm.value;
    if (this.id) {
      this.colorService.updateColor(this.id, color).subscribe(() => {
        this.router.navigate(['/distribution/couleurs']); // Retour à la liste
      });
    } else {
      this.colorService.createColor(color).subscribe(() => {
        this.router.navigate(['/distribution/couleurs']); // Retour à la liste
      });
    }
  }
}
