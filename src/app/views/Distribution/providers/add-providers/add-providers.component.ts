import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { BackButtonComponent } from "src/app/back-button/back-button.component";
// import { UrlConstant } from "src/app/core/constants/url_constants";
import { ensureArray } from "src/app/core/utils/verif-data.utils";
// import { ICity } from "src/app/core/interfaces/country-city.interface";
// import { IDataResponse } from "src/app/core/interfaces/data_response";
// import { ApiService } from "src/app/core/services/api.service";
import { TruncatePipe } from "src/app/shared/pipes/truncate.pipe";
import { BusinessService } from "src/app/shared/services/Business.service";
import { GlobalService } from "src/app/shared/services/Global.service";
import { UtilisService } from "src/app/shared/services/Utilis.service";
// import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-providers",
  templateUrl: "./add-providers.component.html",
  styleUrls: ["./add-providers.component.css"],
  standalone: true, // Standalone component
  imports:[CommonModule , TruncatePipe , RouterModule , FormsModule, ReactiveFormsModule , BackButtonComponent ]
})
export class AddProvidersComponent implements OnInit {
  selectedTab: string = "entreprise";
  entrepriseForm: FormGroup;
  proprietaireForm: FormGroup;
  listCities!: any[];

  loading: boolean = false;

  selectedLogo: File | null = null;
  selectedRegistreRecto: File | null = null;
  selectedRegistreVerso: File | null = null;
  selectedProfilePhoto: File | null = null;
  selectedCniRecto: File | null = null;
  selectedCniVerso: File | null = null;

  previewLogo: string | ArrayBuffer | null = null;
  previewRegistreRecto: string | ArrayBuffer | null = null;
  previewRegistreVerso: string | ArrayBuffer | null = null;
  previewProfilePhoto: string | ArrayBuffer | null = null;
  previewCniRecto: string | ArrayBuffer | null = null;
  previewCniVerso: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private globalService: GlobalService,
    private businessService: BusinessService,
    private router: Router,
    public utilisService: UtilisService,
  ) {
    this.entrepriseForm = this.fb.group({
      logo: [""],
      register_path: [""],
      name: ["", Validators.required],
      ncc: ["", Validators.required],
      email_business: ["", [Validators.required, Validators.email]],
      phone_number_business: ["", Validators.required],
      city_id: ["", Validators.required],
      address: ["", Validators.required],
    });

    this.proprietaireForm = this.fb.group({
      identity_doc_picture: [""],
      picture_path: [""],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      identity_doc_no: ["", Validators.required],
      identity_doc_type: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone_number: ["", Validators.required],
      city_id: [""],
    });
  }

  onFileSelected(event: Event, type: string): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const imageUrl = e.target.result; // This will be the image URL for preview
        switch (type) {
          case "logo":
            this.selectedLogo = file; // Store the file for submission
            this.previewLogo = imageUrl; // Store the URL for preview
            break;
          case "registreRecto":
            this.selectedRegistreRecto = file; // Store the file
            this.previewRegistreRecto = imageUrl; // Preview URL
            break;
          case "registreVerso":
            this.selectedRegistreVerso = file; // Store the file
            this.previewRegistreVerso = imageUrl; // Preview URL
            break;
          case "profilePhoto":
            this.selectedProfilePhoto = file; // Store the file
            this.previewProfilePhoto = imageUrl; // Preview URL
            break;
          case "cniRecto":
            this.selectedCniRecto = file; // Store the file
            this.previewCniRecto = imageUrl; // Preview URL
            break;
          case "cniVerso":
            this.selectedCniVerso = file; // Store the file
            this.previewCniVerso = imageUrl; // Preview URL
            break;
        }
      };

      reader.readAsDataURL(file); // Convert file to Data URL for preview
    }
  }

  ngOnInit(): void {
    this.loadCities();
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  isFormValid(): boolean {
    return this.entrepriseForm.valid && this.proprietaireForm.valid;
  }

  loadCities(): void {
    this.globalService.getCities().subscribe(
   {  next : (res:any) => {
    this.utilisService.response(res, (d:any) => {
      console.log("Ville :", d.data);
      if (d.data) {
        this.listCities = ensureArray(d.data);
      }
    })
       
      },
    error :  (error) => {
        console.error(error);
      }}
    );
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.loading = true;
      console.log("Enregistrement des données...");
      console.log(this.entrepriseForm.value);
      console.log(this.proprietaireForm.value);

      const formData = new FormData();

      // Ajout des fichiers sous forme de tableaux
      if (this.selectedLogo) {
        formData.append("logo", this.selectedLogo as File); // Le logo est un fichier
      }

      // Register Path : un tableau de fichiers
      const registerPathFiles: File[] = [];
      if (this.selectedRegistreRecto) {
        registerPathFiles.push(this.selectedRegistreRecto as File); // Ajout recto
      }
      if (this.selectedRegistreVerso) {
        registerPathFiles.push(this.selectedRegistreVerso as File); // Ajout verso
      }
      registerPathFiles.forEach((file) =>
        formData.append("register_path[]", file)
      ); // Envoyer un tableau

      // Identity Document Picture : un tableau de fichiers
      const identityDocFiles: File[] = [];
      if (this.selectedCniRecto) {
        identityDocFiles.push(this.selectedCniRecto as File); // Ajout CNI recto
      }
      if (this.selectedCniVerso) {
        identityDocFiles.push(this.selectedCniVerso as File); // Ajout CNI verso
      }
      identityDocFiles.forEach((file) =>
        formData.append("identity_doc_picture[]", file)
      ); // Envoyer un tableau

      // Ajout des autres champs de formulaire
      Object.keys(this.entrepriseForm.controls).forEach((key) => {
        if (key !== "logo" && key !== "register_path") {
          formData.append(key, this.entrepriseForm.get(key)?.value);
        }
      });

      Object.keys(this.proprietaireForm.controls).forEach((key) => {
        if (key !== "identity_doc_picture" && key !== "picture_path") {
          formData.append(key, this.proprietaireForm.get(key)?.value);
        }
      });

      // Envoi du formulaire à l'API
      this.businessService
        .create(
         
          formData
        )
        .subscribe({
        next :  (response: any) => {
          this.utilisService.response(response, (d:any) => {
            console.log("Provider created successfully", d);
            this.loading = false;
            Swal.fire({
              title: "Fournisseur créé avec succès!",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              this.router.navigate(["providers"]);
            });
          })
           
          },
        error:  (error: any) => {
            console.error("Error creating provider", error);
            this.loading = false;
            Swal.fire({
              title:`Erreur lors de la création du fournisseur! ${error?.message || 'Veuillez réessayer.'}`,
              icon: "error",
              confirmButtonText: "OK",
            });
          }}
        );
    }
  }
}
