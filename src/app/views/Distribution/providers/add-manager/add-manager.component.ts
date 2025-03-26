import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
// import { UrlConstant } from "src/app/core/constants/url_constants";
import { ensureArray } from "src/app/core/utils/verif-data.utils";
// import { IShop } from "src/app/core/interfaces/business.interface";
// import { ICity } from "src/app/core/interfaces/country-city.interface";
// import { IDataResponse } from "src/app/core/interfaces/data_response";
// import { IDetailsShop } from "src/app/core/interfaces/shop.interface";
// import { ApiService } from "src/app/core/services/api.service";
import { TruncatePipe } from "src/app/shared/pipes/truncate.pipe";
import { DashboardService } from "src/app/shared/services/Dashboard.service";
import { GlobalService } from "src/app/shared/services/Global.service";
import { ManagerService } from "src/app/shared/services/Manager.service";
import { ShopService } from "src/app/shared/services/Shop.service";
import { UtilisService } from "src/app/shared/services/Utilis.service";
// import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-manager",
  templateUrl: "./add-manager.component.html",
  styleUrls: ["./add-manager.component.css"],
  standalone: true, // Standalone component
  imports:[CommonModule , TruncatePipe , RouterModule , FormsModule , ReactiveFormsModule]
})
export class AddManagerComponent implements OnInit {
  gerantForm: FormGroup;
  listCities!: any[];
  shopId!: number | null;
  businessId!: number | null;
  detailsShop!: any;
  listShop!: any[];

  loading: boolean = false;

  selectedProfilePhoto: File | null = null;
  selectedCniRecto: File | null = null;
  selectedCniVerso: File | null = null;

  previewProfilePhoto: string | ArrayBuffer | null = null;
  previewCniRecto: string | ArrayBuffer | null = null;
  previewCniVerso: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private shopService: ShopService,
    private globalService: GlobalService,
    private managerService: ManagerService,
    private router: Router,
    private readonly route: ActivatedRoute,
    public utilisService: UtilisService,
  ) {
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
  }

  onFileSelected(event: Event, type: string): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert(
          "Veuillez sélectionner un fichier de type jpeg, png, jpg ou pdf."
        );
      }

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

  ngOnInit(): void {
    this.shopId = parseInt(this.route.snapshot?.paramMap.get("id")!);
    this.loadCities();
    this.loadShopDetails(this.shopId!);
  }

  isFormValid(): boolean {
    return this.gerantForm.valid;
  }

  loadCities(): void {
    this.globalService.getCities().subscribe(
  {    next :(res:any) => {
    this.utilisService.response(res, (d:any) => {
      console.log("Ville :", d.data);
        if (d.data) {
          this.listCities = ensureArray(d.data);
        }
    })
        
      },
     error: (error) => {
        console.error(error);
      }
   } );
  }

  loadShopDetails(shopId: number): void {
    // Ajout du paramètre de page à l'URL de l'API
    this.shopService.getById(`${shopId}`).subscribe(
    { next : (res: any) => {
      this.utilisService.response(res, (d:any) => {
        if (d.data) {
          this.detailsShop = ensureArray(d.data)[0];
          console.log("listShop :", this.detailsShop);
          // Mettre à jour le champ 'shop_id' dans le formulaire
          this.gerantForm.patchValue({
            shop_id: this.detailsShop.id,
          });
        }
      })
       
      },
     error : (error) => {
        console.error(error);
      }}
    );
  }

  onSubmit() {
    if (this.isFormValid()) {
      if (
        !this.selectedProfilePhoto ||
        !this.selectedCniRecto ||
        !this.selectedCniVerso
      ) {
        alert("Veuillez sélectionner tous les documents requis.");
        return; // Annuler la soumission si des fichiers manquent
      }

      this.loading = true;
      const formData = new FormData();

      formData.append("picture_path", this.selectedProfilePhoto as File);

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

      Object.keys(this.gerantForm.controls).forEach((key) => {
        if (key !== "identity_doc_picture" && key !== "picture_path") {
          formData.append(key, this.gerantForm.get(key)?.value);
        }
      });

      // Soumettre les données
      this.managerService
        .create(
         
          formData
        )
        .subscribe({
         next : (response: any) => {
          this.utilisService.response(response, (d:any) => {
            console.log("Gestionnaire créé avec succès", response);
            this.loading = false;
            Swal.fire({
              title: "Gestionnaire créé avec succès!",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              this.router.navigate(["providers"]);
            });
          })
            
          },
         error : (error: any) => {
            console.error("Erreur lors de la création du gestionnaire", error);
            this.loading = false;
          }}
        );
    }
  }
}
