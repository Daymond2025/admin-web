import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
// import { UrlConstant } from "src/app/core/constants/url_constants";
import { ensureArray } from "src/app/core/utils/verif-data.utils";
// import { IBusiness } from "src/app/core/interfaces/business.interface";
// import { IDataResponse } from "src/app/core/interfaces/data_response";
// import { ApiService } from "src/app/core/services/api.service";
import { TruncatePipe } from "src/app/shared/pipes/truncate.pipe";
import { BusinessService } from "src/app/shared/services/Business.service";
import { UtilisService } from "src/app/shared/services/Utilis.service";

@Component({
  selector: "app-providerslist",
  templateUrl: "./providerslist.component.html",
  styleUrls: ["./providerslist.component.css"],
  standalone: true, // Standalone component
  imports:[CommonModule , TruncatePipe , RouterModule ]
})
export class ProviderslistComponent implements OnInit {
  dataGlobal!: any;
  listBusiness: any[] = [];
  filteredBusiness: any[] = [];
  isLoading: boolean = true;

  filterStatus: string = "active";

  // Variables de pagination
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 5;

  constructor(private readonly businessService: BusinessService,  public utilisService: UtilisService,) {}

  ngOnInit(): void {
    this.loadBusiness();
  }

  loadBusiness(page: number = 1): void {
    this.isLoading = true;
    console.log("Loader activé :", this.isLoading);

    // Ajout du paramètre de page à l'URL de l'API
    this.businessService.getAll({page:page}).subscribe({
     next : (res: any) => {
      this.utilisService.response(res, (d:any) => {
        if (d.data) {
          this.dataGlobal = d;
          this.listBusiness = ensureArray(d.data);

          this.applyFilter();

          // Gestion de la pagination
          this.currentPage = d!.meta!.current_page;
          this.totalPages = d!.meta!.last_page;
          this.perPage = d!.meta!.per_page;
        }
        this.isLoading = false;
        console.log("Loader désactivé :", this.isLoading);
      })
       
      },
     error : (error) => {
        console.error(error);
        this.isLoading = false;
      }}
    );
  }

  // Méthode pour appliquer le filtre
  applyFilter(): void {
    this.isLoading = true;
    this.filteredBusiness = this.listBusiness.filter(
      (business) => business.is_locked === this.filterStatus
    );
    this.isLoading = false;
  }

  // Méthode pour changer de filtre
  changeFilter(status: string): void {
    this.isLoading = true;
    this.filterStatus = status;
    this.applyFilter();
    this.isLoading = false;
  }

  // Méthode pour changer de page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadBusiness(page);
    }
  }
}
