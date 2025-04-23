import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, RouterModule } from "@angular/router";
import { BackButtonComponent } from "src/app/back-button/back-button.component";
// import { UrlConstant } from "src/app/core/constants/url_constants";
import { ensureArray } from "src/app/core/utils/verif-data.utils";
// import {
//   IBusiness,
//   IDetailsBusiness,
// } from "src/app/core/interfaces/business.interface";
// import { IDataResponse } from "src/app/core/interfaces/data_response";
// import { IDetailsOrder, IOrder } from "src/app/core/interfaces/order.interface";
// import { ApiService } from "src/app/core/services/api.service";
import { TruncatePipe } from "src/app/shared/pipes/truncate.pipe";
import { BusinessService } from "src/app/shared/services/Business.service";
import { UtilisService } from "src/app/shared/services/Utilis.service";

@Component({
  selector: "app-providerscommandes",
  templateUrl: "./providerscommandes.component.html",
  styleUrls: ["./providerscommandes.component.css"],
  standalone: true, // Standalone component
  imports:[CommonModule , TruncatePipe , RouterModule , BackButtonComponent ]
})
export class ProviderscommandesComponent implements OnInit {
  businessId!: number;
  detailsBusiness!: any;
  listOrders: any[] = [];
  isLoading: boolean = false;
  filterStatus: string = "";

  // Variables de pagination
  currentPage: number | null | undefined = 1;
  totalPages: number | null | undefined = 1;
  perPage: number | null | undefined = 5;

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private readonly route: ActivatedRoute,
    public utilisService: UtilisService,
  ) {}

  ngOnInit(): void {
    this.businessId = parseInt(this.route.snapshot?.paramMap.get("id")!, 10);
    this.loadOrdersBusiness(this.businessId);
    this.loadBusiness(this.businessId);
  }

  loadOrdersBusiness(
    businessId: number,
    data?:any
  ): void {
    this.isLoading = true;
    this.businessService
      .getByIdOrder(
        data,
        businessId
      )
      .subscribe(
      { next : (data: any) => {
        this.utilisService.response(data, (d:any) => {
          if (d.data) {
            this.listOrders = ensureArray(d.data);
            console.log("Détails du business :", this.listOrders);
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

  calculateTotals() {
    let totalAmount = 0;
    let totalFees = 0;

    this.listOrders.forEach((order) => {
      order?.items.forEach((item:any) => {
        // Vérification si item.total et item.total_fees existent et sont des nombres
        totalAmount += item.total ? Number(item.total) : 0;
        totalFees += item.total_fees ? Number(item.total_fees) : 0;
      });
    });

    return {
      totalAmount,
      totalFees,
    };
  }

  calculateTotalAmountToPay() {
    const totals = this.calculateTotals();
    return totals.totalAmount + totals.totalFees;
  }

  loadBusiness(businessId: number): void {
    this.isLoading = true;
    this.businessService.getById(businessId).subscribe(
    {  next :(data: any) => {
      this.utilisService.response(data, (d:any) => {
        if (d.data) {
          this.detailsBusiness = ensureArray(d.data)[0];
          console.log("Détails du business :", this.detailsBusiness);
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
      this.currentPage = page;
      this.loadOrdersBusiness(this.businessId, page);
    }
  }

  // Filtrage avec requêtes côté serveur
  filterByNew(): void {
    this.filterStatus = "confirm";
    const queryParams = "&status=confirm";
    this.loadOrdersBusiness(this.businessId,{page:1, status:this.filterStatus});
  }

  filterByPending(): void {
    this.filterStatus = "pending";
    const queryParams = "&status=pending";
    this.loadOrdersBusiness(this.businessId, {page:1, status:this.filterStatus});
  }

  filterByInProgress(): void {
    this.filterStatus = "in_progress";
    const queryParams = "&status=in_progress";
    this.loadOrdersBusiness(this.businessId, {page:1, status:this.filterStatus});
  }

  filterByLivree(): void {
    this.filterStatus = "validated";
    const queryParams = "&status=validated";
    this.loadOrdersBusiness(this.businessId,{ page:1, status:"validated"});
  }

  filterByCancel(): void {
    this.filterStatus = "canceled";
    const queryParams = "&status=canceled";
    this.loadOrdersBusiness(this.businessId,{ page:1, status:"canceled"});
  }
  resetFilter(): void {
    this.filterStatus = "";
    this.loadOrdersBusiness(this.businessId, 1);
  }
}
