import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, RouterModule } from "@angular/router";
// import { UrlConstant } from "src/app/core/constants/url_constants";
import { ensureArray } from "src/app/core/utils/verif-data.utils";
// import { IDetailsBusiness } from "src/app/core/interfaces/business.interface";
// import { IDataResponse } from "src/app/core/interfaces/data_response";
// import { IProduct } from "src/app/core/interfaces/product.interface";
// import { ApiService } from "src/app/core/services/api.service";
import { TruncatePipe } from "src/app/shared/pipes/truncate.pipe";
import { BusinessService } from "src/app/shared/services/Business.service";
import { ProduitsService } from "src/app/shared/services/Produits.service";
import { UtilisService } from "src/app/shared/services/Utilis.service";

@Component({
  selector: "app-providersproducts",
  templateUrl: "./providersproducts.component.html",
  styleUrls: ["./providersproducts.component.css"],
  standalone: true, // Standalone component
  imports:[CommonModule , TruncatePipe , RouterModule ]
})
export class ProvidersproductsComponent implements OnInit {
  businessId!: number;
  detailsBusiness!: any;
  listProducts: any[] = [];
  filteredProducts: any[] = [];
  dataGlobal!: any;
  isLoading: boolean = false;
  filterStatus: string = "";

  // Variables de pagination
  currentPage: number | null | undefined = 1;
  totalPages: number | null | undefined = 1;
  perPage: number | null | undefined = 5;

  constructor(
    private businessService: BusinessService,
    private productService: ProduitsService,
    private router: Router,
    private readonly route: ActivatedRoute,
    public utilisService: UtilisService,
  ) {}

  ngOnInit(): void {
    this.businessId = parseInt(this.route.snapshot?.paramMap.get("id")!, 10);
    this.loadDetailsBusiness(this.businessId);
    this.loadProducts();
  }

  // Charger les produits avec des filtres optionnels
  loadProducts(data?:any): void {
    this.isLoading = true;
    this.productService
      .getAll(
       data
      )
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
       error: (error) => {
          console.error(error);
          this.isLoading = false;
        }}
      );
  }

  loadDetailsBusiness(businessId: number): void {
    this.businessService.getById(businessId).subscribe(
      {next :(data: any) => {
        this.utilisService.response(data, (d:any) => {
          if (d.data) {
            this.detailsBusiness = ensureArray(d.data)[0];
          }
          this.isLoading = false;
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
      this.loadProducts(page);
    }
  }

  // Filtrage avec requêtes côté serveur
  filterByInStock(): void {
    this.filterStatus = "inStock";
    const queryParams = "&_stock=true";
    this.loadProducts({page:1, _stock:true});
  }

  filterByOutOfStock(): void {
    this.filterStatus = "outOfStock";
    const queryParams = "&_stock='";
    this.loadProducts({page:1, _stock:''});
  }

  filterByInactive(): void {
    this.filterStatus = "inactive";
    const queryParams = "&unavailable='";
    this.loadProducts({page:1, unavailable:''});
  }

  resetFilter(): void {
    this.filterStatus = "";
    this.loadProducts();
  }
}
