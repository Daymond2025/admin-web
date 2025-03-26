import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
// import { UrlConstant } from "src/app/core/constants/url_constants";
import { ensureArray } from "src/app/core/utils/verif-data.utils";
// import { IDashboard, IDataResponse } from "src/app/core/interfaces/data_response";
// import { IProduct } from "src/app/core/interfaces/product.interface";
// import { ApiService } from "src/app/core/services/api.service";
import { TruncatePipe } from "src/app/shared/pipes/truncate.pipe";
import { DashboardService } from "src/app/shared/services/Dashboard.service";
import { ProduitsService } from "src/app/shared/services/Produits.service";
import { UtilisService } from "src/app/shared/services/Utilis.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
  standalone: true, // Standalone component
  imports:[CommonModule , TruncatePipe , RouterLink ]
})
export class DashboardComponent {
  dataDashboard: any;
  listProducts: any[] = [];
  filteredProducts: any[] = [];
  dataGlobal!: any;
  isLoading: boolean = false;

  activeFilter: string = 'inStock';
  currentQueryParams: any = {_stock:true};

  // Variables de pagination
  currentPage: number | null | undefined = 1;
  totalPages: number | null | undefined = 1;
  perPage: number | null | undefined = 5;

  constructor(
      private readonly dashboardService: DashboardService,
      private readonly router: Router,
      public utilisService: UtilisService,
      private readonly produitsService: ProduitsService,
  )
  {}

  goToComptable(): void {
    this.router.navigate(["/accountant"]);
  }

  goToOrder(): void {
    this.router.navigate(["distribution/commandes/list_coord"]);
  }

  ngOnInit(): void {
    this.loadDataDashboard();
    this.filterByInStock(); // Set initial state and load products
  }

  loadDataDashboard(): void {
    this.isLoading = true;
    this.dashboardService.getAll({option:"dashboard"}).subscribe(
    { next : (data: any) => {
      this.utilisService.response(data, (d:any) => {
        if (d) {
          this.isLoading = false;
          console.log("Données du dashboard :", d);
          this.dataDashboard = d;
        }
      })
        },
       error : (error) => {
          console.error(error);
          this.isLoading = false;
        }}
    );
  }

  // Méthode pour charger les produits avec des paramètres de requête
  loadProducts(data:any): void {
    this.isLoading = true;
    this.produitsService
      .getAll(data)
      .subscribe(
       {next : (data: any) => {
        this.utilisService.response(data, (d:any) => {
          if (d.data) {
            this.dataGlobal = d;
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
        })
          
        },
       error : (error) => {
          console.error(error);
          this.isLoading = false;
        }}
      );
  }

  // Méthode pour changer de page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages!) {
      this.loadProducts({page:page, ...this.currentQueryParams}); // Pass current query params
    }
  }

  // Méthodes de filtrage avec requêtes au serveur
  filterByInStock(): void {
    this.activeFilter = 'inStock'; // Set the active filter
    this.currentQueryParams = {_stock:true}; // Save query params
    this.loadProducts({page:1, ...this.currentQueryParams});
  }

  filterByOutOfStock(): void {
    this.activeFilter = 'outOfStock'; // Set the active filter
    this.currentQueryParams = {_stock:''}; // Save query params
    this.loadProducts({page:1,... this.currentQueryParams});
  }

  filterByInactive(): void {
    this.activeFilter = 'inactive'; // Set the active filter
    this.currentQueryParams = {unavailable:''}; // Save query params
    this.loadProducts({page:1, ...this.currentQueryParams});
  }
}
