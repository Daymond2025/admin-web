import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/shared/services/brand.service';

@Component({
  selector: 'app-brand-form',
  templateUrl: "./brand-form.component.html",
  styleUrls: ["./brand-form.component.css"]
})
export class BrandFormComponent implements OnInit {
  brandForm!: FormGroup;
  id: number | null = null;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.brandForm = this.fb.group({
      name: [''],
      picture_path: [null]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.brandService.getBrand(this.id).subscribe(res => {
        this.brandForm.patchValue({ name: res.name });
        this.imagePreview = res.picture_path;
      });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.brandForm.patchValue({ picture_path: file });
    }
  }

  submit(): void {
    const formData = new FormData();
    formData.append('name', this.brandForm.value.name);
    if (this.brandForm.value.picture_path)
      formData.append('picture_path', this.brandForm.value.picture_path);

    if (this.id) {
      this.brandService.updateBrand(this.id, formData).subscribe(() => {
        this.router.navigate(['/distribution/brand-management']);
      });
    } else {
      this.brandService.createBrand(formData).subscribe(() => {
        this.router.navigate(['/distribution/brand-management']);
      });
    }
  }
}
