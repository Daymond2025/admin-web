//import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ProduitsService } from 'src/app/shared/services/Produits.service';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-winning-products',
  standalone: true,
  imports: [CommonModule], // <- ajoute CommonModule ici
  providers: [DecimalPipe], // <- pour le pipe number si besoin
  templateUrl: './winning-products.component.html',
  styleUrl: './winning-products.component.css'
})
export class WinningProductsComponent implements OnInit {
  winningProducts: any[] = [];
  loading = false;
  currentPage = 1;
  perPage = 20;
  totalItems = 0;

  constructor(private produitsService: ProduitsService) {}

  ngOnInit(): void {
    this.fetchWinningProducts();
  }

  fetchWinningProducts(page: number = 1) {
    this.loading = true;
    this.produitsService.getWinningProducts({ page, per_page: this.perPage }).subscribe({
      next: (res: any) => {
        this.winningProducts = res.body.data;
        this.totalItems = res.body.total || this.winningProducts.length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur récupération produits gagnants', err);
        this.loading = false;
      }
    });
  }

  // Pagination simple
  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchWinningProducts(page);
  }
}
