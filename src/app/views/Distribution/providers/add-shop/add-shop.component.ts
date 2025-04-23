import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { BackButtonComponent } from "src/app/back-button/back-button.component";
// import { UrlConstant } from "src/app/core/constants/url_constants";
import { ensureArray } from "src/app/core/utils/verif-data.utils";
// import {
//   IDetailsBusiness,
//   IShop,
// } from "src/app/core/interfaces/business.interface";
// import { ICity } from "src/app/core/interfaces/country-city.interface";
// import { IDataResponse } from "src/app/core/interfaces/data_response";
// import { ApiService } from "src/app/core/services/api.service";
import { TruncatePipe } from "src/app/shared/pipes/truncate.pipe";
import { BusinessService } from "src/app/shared/services/Business.service";
import { GlobalService } from "src/app/shared/services/Global.service";
import { ShopService } from "src/app/shared/services/Shop.service";
import { UtilisService } from "src/app/shared/services/Utilis.service";
// import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-shop",
  templateUrl: "./add-shop.component.html",
  styleUrls: ["./add-shop.component.css"],
  standalone: true, // Standalone component
  imports:[CommonModule , TruncatePipe , RouterModule , FormsModule , ReactiveFormsModule ,BackButtonComponent]
})
export class AddShopComponent implements OnInit {
  selectedTab: string = "boutique";
  businessId!: number | null;
  detailsBusiness!: any;
  listShop!: any[];
  listCities!: any[];
  isLoading: boolean = true;

  // Ajoutez deux variables distinctes pour les logos de recharge et de retrait
  logos: { [key: string]: string } = {
    orange: "assets/img/Orangemoney.png",
    mtn: "assets/img/mtnMonney.png",
    wave: "assets/img/wave.png",
    moov: "assets/img/moovMonney.png",
  };
  selectedRechargeLogo: string = this.logos["orange"];
  selectedRetraitLogo: string = this.logos["orange"];

  selectedProfilePhoto: File | null = null;
  selectedCniRecto: File | null = null;
  selectedCniVerso: File | null = null;

  previewProfilePhoto: string | ArrayBuffer | null = null;
  previewCniRecto: string | ArrayBuffer | null = null;
  previewCniVerso: string | ArrayBuffer | null = null;

  boutiqueForm: FormGroup;
  gerantForm: FormGroup;
  // compteForm: FormGroup;

  loading: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly globalService: GlobalService,
    private readonly businessService: BusinessService,
    private readonly shopService: ShopService,
    public utilisService: UtilisService,
  ) {
    this.boutiqueForm = this.fb.group({
      // logo: [''],
      // register_path: [''],
      name: ["", Validators.required],
      business_id: [this.businessId, Validators.required],
      email_shop: ["", [Validators.required, Validators.email]],
      phone_number_shop: ["", Validators.required],
      phone_number: ["", Validators.required],
      city_id: ["", Validators.required],
      address: ["", Validators.required],
      // categorie_product_selled: ["", Validators.required],
    });

    this.gerantForm = this.fb.group({
      identity_doc_picture: [""],
      picture_path: [""],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      identity_doc_no: ["", Validators.required],
      identity_doc_type: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone_number: ["", Validators.required],
      city_id: [""],
      shop_id: ["", Validators.required],
    });

    // this.compteForm = this.fb.group({
    //   recharge_account_phone: ["", Validators.required],
    //   recharge_account_type: ["", Validators.required],
    //   withdrawal_account_phone: ["", Validators.required],
    //   withdrawal_account_type: ["", Validators.required],
    // });
  }

  ngOnInit(): void {
    this.businessId = parseInt(this.route.snapshot?.paramMap.get("id")!);
    this.loadCities();
    this.loadBusinessDetails(this.businessId!);
    this.boutiqueForm.patchValue({
      business_id: this.businessId,
    });
  }

  isFormValid(): boolean {
    return this.boutiqueForm.valid;
  }

  onFileSelected(event: Event, type: string): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const imageUrl = e.target.result;
        switch (type) {
          case "profilePhoto":
            this.selectedProfilePhoto = file;
            this.previewProfilePhoto = imageUrl;
            break;
          case "cniRecto":
            this.selectedCniRecto = file;
            this.previewCniRecto = imageUrl;
            break;
          case "cniVerso":
            this.selectedCniVerso = file;
            this.previewCniVerso = imageUrl;
            break;
        }
      };

      reader.readAsDataURL(file);
    }
  }

  loadCities(): void {
    this.globalService.getCities().subscribe(
   {  next : (res: any) => {
    this.utilisService.response(res, (d:any) => {
      console.log("Ville :", d.data);
      if (d.data) {
      this.listCities = ensureArray(d.data);
      }
    })
       
      },  
     error : (error) => {
        console.error(error);
      }}
    );
  }

  loadBusinessDetails(businessId: number): void {
    this.isLoading = true;
    console.log("Loader activé :", this.isLoading);

    // Ajout du paramètre de page à l'URL de l'API
    this.businessService.getById(businessId).subscribe(
     {next : (res: any) => {
      this.utilisService.response(res, (d:any) => {
        if (d.data) {
          this.detailsBusiness = ensureArray(d.data)[0];
          this.listShop = this.detailsBusiness.shops;
          console.log("Détails du business :", this.detailsBusiness);
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

  onSubmit(): void {
    // if (this.isFormValid()) {
      console.log("Form is valid");
      this.loading = true;
      console.log(this.boutiqueForm.value);
      console.log(this.gerantForm.value);
      const formData = new FormData();

      // Identity Document Picture : un tableau de fichiers
      const identityDocFiles: File[] = [];
      if (this.selectedCniRecto) {
        identityDocFiles.push(this.selectedCniRecto as File);
      }
      if (this.selectedCniVerso) {
        identityDocFiles.push(this.selectedCniVerso as File);
      }
      identityDocFiles.forEach((file) =>
        formData.append("identity_doc_picture[]", file)
      ); // Envoyer un tableau

      if (this.selectedProfilePhoto) {
        formData.append("picture_path", this.selectedProfilePhoto as File);
      }

      Object.keys(this.gerantForm.controls).forEach((key) => {
        if (key !== "identity_doc_picture" && key !== "picture_path") {
          formData.append(key, this.gerantForm.get(key)?.value);
        }
      });

      // Envoi du formulaire à l'API
      this.shopService
        .create(this.boutiqueForm.value)
        .subscribe(
      { next :   (response: any) => {
        this.utilisService.response(response, (d:any) => {
          console.log("Provider created successfully", response);
            this.loading = false;
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Boutique ajouter avec succès',
              showConfirmButton: false,
              timer: 2000,
            });
            this.router.navigate(["providers/details/", this.businessId]);
        })
            
          },
        error :  (error: any) => {
            console.error("Error creating provider", error);
            this.loading = false;
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Erreur lors de l\'ajout de la boutique',
              showConfirmButton: false,
              timer: 2000,
            });
          }}
        );

      // this.apiService
      //   .postWithFormData(
      //     `${environment.BASE_URL}/${UrlConstant.MANAGER_URL}`,
      //     formData
      //   )
      //   .subscribe(
      //     (response: any) => {
      //       console.log("Provider created successfully", response);
      //       this.loading = false;
      //       this.router.navigate(["providers"]);
      //     },
      //     (error: any) => {
      //       console.error("Error creating provider", error);
      //       this.loading = false;
      //     }
      //   );
    // }
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  // Méthodes séparées pour les changements des logos de recharge et retrait
  onRechargeServiceChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    this.selectedRechargeLogo = this.logos[selectedValue];
  }

  onRetraitServiceChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    this.selectedRetraitLogo = this.logos[selectedValue];
  }
}
