import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
// import { UrlConstant } from "src/app/core/constants/url_constants";
import { ensureArray } from "src/app/core/utils/verif-data.utils";
import { TruncatePipe } from "src/app/shared/pipes/truncate.pipe";
import { ProduitsService } from "src/app/shared/services/Produits.service";
import { UtilisService } from "src/app/shared/services/Utilis.service";
import { RouterModule } from '@angular/router'; // ✅ Importation requise

// import { IDataResponse } from "src/app/core/interfaces/data_response";
// import { IProduct } from "src/app/core/interfaces/product.interface";
// import { ApiService } from "src/app/core/services/api.service";

@Component({
  selector: "app-new",
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.css"],
  standalone: true, // Standalone component
  imports:[CommonModule , TruncatePipe , RouterModule ]
})
export class NewComponent implements OnInit {
  listProducts: any[] = [];
  filteredProducts: any[] = [];
  dataGlobal!: any;
  isLoading: boolean = false;
  filterStatus: string = "";

  // Variables de pagination
  currentPage: number | null | undefined = 1;
  totalPages: number | null | undefined = 1;
  perPage: number | null | undefined = 5;

  constructor(private readonly produitsService: ProduitsService, public utilisService: UtilisService,) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(obj?:any){
    this.isLoading = true;
    this.produitsService.getAll(obj).subscribe({
      next: (data) => {
        this.utilisService.response(data, (d:any) => {
          console.log('produits',d)
          if (d.data) {
            this.dataGlobal = data;
            this.listProducts = ensureArray(d.data);
            this.filteredProducts = this.listProducts;
            this.isLoading = false;

            // Gestion de la pagination
            this.currentPage = d.meta?.current_page;
            this.totalPages = d.meta?.last_page;
            this.perPage = d.meta?.per_page;
          } else {
            console.error("No content found in response");
            this.isLoading = false;
          }
        });
      },
      error: (error) => {
        this.utilisService.response(error,(d:any)=>{
    
        })
      },
    });
  }

  // loadProducts(obj? : any): void {
  //   this.isLoading = true;
   
  //   this.produitsService
  //     .getAll(obj)
  //     .subscribe(
  //       (data: any) => {
  //         if (data.data) {
  //           this.dataGlobal = data;
  //           this.listProducts = ensureArray(data.data);
  //           this.filteredProducts = this.listProducts;
  //           this.isLoading = false;

  //           // Gestion de la pagination
  //           this.currentPage = data.meta?.current_page;
  //           this.totalPages = data.meta?.last_page;
  //           this.perPage = data.meta?.per_page;
  //         } else {
  //           console.error("No content found in response");
  //           this.isLoading = false;
  //         }
  //       },
  //       (error) => {
  //         console.error(error);
  //         this.isLoading = false;
  //       }
  //     );
  // }

  // Méthode pour changer de page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages!) {
      this.loadProducts({page:page});
    }
  }

  // Méthodes de filtrage avec requêtes au serveur
  filterByInStock(): void {
    this.filterStatus = "inStock";
    // const queryParams = "&_stock=true";
    this.loadProducts({page:1, _stock:true});
  }

  filterByPublished(): void {
    this.filterStatus = "published";
    // const queryParams = "&publish=true";
    this.loadProducts({page:1, publish:true});
  }

  filterByOutOfStock(): void {
    this.filterStatus = "outOfStock";
    // const queryParams = "&_stock=''";
    this.loadProducts({page:1, _stock:''});
  }

  filterByInactive(): void {
    this.filterStatus = "inactive";
    // const queryParams = "&unavailable=''";
    this.loadProducts({page:1, unavailable:''});
  }

  resetFilter(): void {
    this.filterStatus = "";
    this.loadProducts();
  }
}
