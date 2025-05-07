import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandService, Brand } from 'src/app/shared/services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: "./brand-list.component.html",
  styleUrls: ["./brand-list.component.css"],
})
export class BrandListComponent implements OnInit {
  brands: Brand[] = [];

  constructor(private brandService: BrandService, private router: Router) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.brandService.getBrands().subscribe((data: any) => {
      this.brands = data.data;
    });
  }

  deleteBrand(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette marque ?')) {
      this.brandService.deleteBrand(id).subscribe(() => {
        this.loadBrands();
      });
    }
  }

  
  addBrand(): void {
    -   this.router.navigate(['distribution/brand-management/create']);
    +   this.router.navigate(['/distribution/marques/create']);
  }
  editBrand(id: number): void {
    this.router.navigate(['/distribution/marques/edit', id]);
  }
}
