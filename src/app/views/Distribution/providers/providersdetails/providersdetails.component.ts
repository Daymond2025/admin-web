import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BackButtonComponent } from 'src/app/back-button/back-button.component';
// import { UrlConstant } from 'src/app/core/constants/url_constants';
import { ensureArray } from 'src/app/core/utils/verif-data.utils';
// import { IDetailsBusiness, IShop } from 'src/app/core/interfaces/business.interface';
// import { IDataResponse } from 'src/app/core/interfaces/data_response';
// import { ApiService } from 'src/app/core/services/api.service';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { BusinessService } from 'src/app/shared/services/Business.service';
import { UtilisService } from 'src/app/shared/services/Utilis.service';

@Component({
  selector: 'app-providersdetails',
  templateUrl: './providersdetails.component.html',
  styleUrls: ['./providersdetails.component.css'],
  standalone: true, // Standalone component
  imports:[CommonModule , TruncatePipe , RouterModule , FormsModule , ReactiveFormsModule, BackButtonComponent ]
})
export class ProvidersdetailsComponent implements OnInit {
  dataGlobal!: any;
  detailsBusiness!: any;
  listShops!: any[];
  selectedShop!: any;
  selectedShopId!: number;
  isLoading: boolean = true;

  flag: string | null = null;
  selectedAdminInfo: any;
  selectedBusinessInfo: any;
  selectedShopInfo: any;

  constructor(
    private businessService: BusinessService,
    private route: ActivatedRoute,
    public utilisService: UtilisService,
  ) {}

  ngOnInit(): void {
    const businessId = parseInt(this.route.snapshot?.paramMap.get('id')!);
    this.loadBusinessDetails(businessId);
  }

  loadBusinessDetails(businessId: number): void {
    this.isLoading = true;
    console.log('Loader activé :', this.isLoading);

    this.businessService.getById(businessId).subscribe(
     { next :(res: any) => {
      this.utilisService.response(res, (d:any) => {
        if (d.data) {
          this.dataGlobal = d;
          this.detailsBusiness = ensureArray(d.data)[0];
          this.listShops = this.detailsBusiness.shops;
          if (this.listShops && this.listShops.length > 0) {
            this.selectedShop = this.listShops[0];
            this.selectedShopId = this.selectedShop.id;
          }
        }
        this.isLoading = false;
      })
        
      },
      error :(error) => {
        console.error(error);
        this.isLoading = false;
      }}
    );
  }

  onShopChange(event: Event): void {
    const selectedShopId = +(event.target as HTMLSelectElement).value;
    this.selectedShop = this.listShops.find(shop => shop.id === selectedShopId)!;
    console.log('Shop sélectionné :', this.selectedShop);
  }

  // Méthode pour ouvrir le modal et charger les infos
  openModal(type: 'admin' | 'business' | 'shop' | 'gerant'): void {
    this.flag = type;
    console.log('Type :', type);
    if (type === 'admin') {
      this.selectedAdminInfo = this.detailsBusiness.admin; // Chargez les infos de l'administrateur
    }
    else if (type ==='shop') {
      this.selectedShopInfo = this.selectedShop; // Chargez les infos du shop
    }
    else if (type === 'gerant') {
      this.selectedBusinessInfo = this.selectedShop.managers[0]; // Chargez les infos de l'entreprise
    }
     else {
      this.selectedBusinessInfo = this.detailsBusiness.business; // Chargez les infos de l'entreprise
    }
  }
}
