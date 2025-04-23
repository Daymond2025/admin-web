import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, RouterModule } from "@angular/router";
import { BackButtonComponent } from "src/app/back-button/back-button.component";
// import { UrlConstant } from "src/app/core/constants/url_constants";
import { ensureArray } from "src/app/core/utils/verif-data.utils";
// import { IDetailsBusiness } from "src/app/core/interfaces/business.interface";
// import { IDataResponse } from "src/app/core/interfaces/data_response";
// import { IDetailsOrder } from "src/app/core/interfaces/order.interface";
// import { ITransaction } from "src/app/core/interfaces/transaction.interface";
// import { ApiService } from "src/app/core/services/api.service";
import { TruncatePipe } from "src/app/shared/pipes/truncate.pipe";
import { BusinessService } from "src/app/shared/services/Business.service";
import { TransactionsService } from "src/app/shared/services/Transactions.service";
import { UtilisService } from "src/app/shared/services/Utilis.service";

@Component({
  selector: "app-providerscomptables",
  templateUrl: "./providerscomptables.component.html",
  styleUrls: ["./providerscomptables.component.css"],
  standalone: true, // Standalone component
  imports:[CommonModule , TruncatePipe , RouterModule , BackButtonComponent]
})
export class ProviderscomptablesComponent implements OnInit {
  businessId!: number;
  detailsBusiness!: any;
  detailsBusinessWallet: any[] = [];
  filteredTransOrdersSolde: any[] = [];
  filteredTransOrdersNotSolde: any[] = [];
  isLoading: boolean = false;
  filterStatus: string = "not_solde";

  // Variables de pagination
  currentPage: number | null | undefined = 1;
  totalPages: number | null | undefined = 1;
  perPage: number | null | undefined = 5;

  constructor(
    private businessService: BusinessService,
    private transactionsService: TransactionsService,
    private router: Router,
    private readonly route: ActivatedRoute,
    public utilisService: UtilisService,
  ) {}

  ngOnInit(): void {
    this.businessId = parseInt(this.route.snapshot?.paramMap.get("id")!, 10);
    this.loadBusiness(this.businessId);
    // this.loadTransactionByBusiness(this.businessId);
  }

  loadBusiness(businessId: number): void {
    this.isLoading = true;
    this.businessService.getById(businessId).subscribe(
    {  next:(data: any) => {
      this.utilisService.response(data, (d:any) => {
        if (d.data) {
          this.detailsBusiness = ensureArray(d.data)[0];
          console.log("Détails du business :", this.detailsBusiness.wallet);
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

  loadTransactionByBusiness(businessId: number, page: number = 1): void {
    this.filterStatus = "transaction";
    this.isLoading = true;
    this.transactionsService
      .getAll(
      { business:businessId,category:"transaction",page:page}
      )
      .subscribe(
      { next : (data: any) => {
        this.utilisService.response(data, (d:any) => {
          if (d.data) {
            this.detailsBusinessWallet = ensureArray(d.data);
            console.log("Détails du transaction :", this.detailsBusinessWallet);
          }
          this.isLoading = false;
        })
         
        },
      error :  (error) => {
          console.error(error);
          this.isLoading = false;
        }}
      );
  }

  // Charger les transactions soldées
  loadSoldTransactions(page: number = 1, perPage: number = 5): void {
    this.filterStatus = "solde";
    this.isLoading = true;
    const url = {business:this.businessId,category:"sale",status:"solde",page:page,perPage:perPage};

    this.transactionsService.getAll(url).subscribe(
     { next :(response: any) => {
      this.utilisService.response(response, (d:any) => {
        if (d.data) {
          this.filteredTransOrdersSolde = ensureArray(d.data);
          console.log("Transactions soldées :", this.filteredTransOrdersSolde);

          // Mise à jour des informations de pagination
          this.currentPage = d.meta?.current_page || 1;
          this.totalPages = d.meta?.last_page || 1;
          this.perPage = d.meta?.per_page || 5;
        }
        this.isLoading = false;
      })
        
      },
     error : (error) => {
        console.error(
          "Erreur lors de la récupération des transactions soldées",
          error
        );
        this.isLoading = false;
      }}
    );
  }

  // Charger les transactions non soldées
  loadNonSoldTransactions(page: number = 1, perPage: number = 5): void {
    this.filterStatus = "not_solde";
    this.isLoading = true;
    const url = {business:this.businessId,category:"sale",status:"non_solde",page:page,perPage:perPage};

    this.transactionsService.getAll(url).subscribe(
     { next :(response: any) => {
      this.utilisService.response(response, (d:any) => {
        if (d.data) {
          this.filteredTransOrdersNotSolde = ensureArray(d.data);
          console.log(
            "Transactions non soldées :",
            this.filteredTransOrdersNotSolde
          );

          // Mise à jour des informations de pagination
          this.currentPage = d.meta?.current_page || 1;
          this.totalPages = d.meta?.last_page || 1;
          this.perPage = d.meta?.per_page || 5;
        }
        this.isLoading = false;
      })
        
      },
     error : (error) => {
        console.error(
          "Erreur lors de la récupération des transactions non soldées",
          error
        );
        this.isLoading = false;
      }}
    );
  }

  // Méthode pour changer de page pour les transactions soldées
  goToPageForSoldTrans(page: number): void {
    if (page >= 1 && page <= this.totalPages!) {
      this.loadSoldTransactions(page, this.perPage!);
    }
  }

  // Méthode pour changer de page pour les transactions non soldées
  goToPageForNonSoldTrans(page: number): void {
    if (page >= 1 && page <= this.totalPages!) {
      this.loadNonSoldTransactions(page, this.perPage!);
    }
  }

  // Méthode pour changer de page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages!) {
      this.loadTransactionByBusiness(this.businessId, page);
    }
  }
}
