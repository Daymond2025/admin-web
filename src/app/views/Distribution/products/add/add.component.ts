import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
// import { UrlConstant } from "src/app/core/constants/url_constants";
import { ensureArray } from "src/app/core/utils/verif-data.utils";
// import { IBusiness } from "src/app/core/interfaces/business.interface";
// import { ICity } from "src/app/core/interfaces/country-city.interface";
// import { ColorFormat } from "src/app/core/interfaces/country-city.interface";
// import { IDataResponse } from "src/app/core/interfaces/data_response";
// import { IDetailsShop } from "src/app/core/interfaces/shop.interface";
// import { ApiService } from "src/app/core/services/api.service";
import { ImageDialogComponent } from "src/app/shared/components/image-dialog/image-dialog.component";
// import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { FormArray } from "@angular/forms";
import { GlobalService } from "src/app/shared/services/Global.service";
import { ShopService } from "src/app/shared/services/Shop.service";
import { ProduitsService } from "src/app/shared/services/Produits.service";
import { CommonModule } from "@angular/common";
import { TruncatePipe } from "src/app/shared/pipes/truncate.pipe";
import { UtilisService } from "src/app/shared/services/Utilis.service";
import { BackButtonComponent } from "src/app/back-button/back-button.component";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"],
  standalone: true, // Standalone component
  imports: [
    CommonModule,
    TruncatePipe,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BackButtonComponent,
  ],
})
export class AddComponent implements OnInit {
  productForm!: FormGroup;
  selectedBoutique: any;
  listCities!: any[];
  listStates: any[] = [];
  listCategories: any[] = [];
  selectedCategoryId: number | null = null;
  listSubCategories: any[] = [];
  listBrand: any[] = [];
  selectedType: string = "vente";

  @ViewChild("boutiquePopup") boutiquePopup!: TemplateRef<any>;
  popupVisible: boolean = false;

  isLoading: boolean = false;

  isFavorite: boolean = false;
  selectedImages: File[] = [];
  previewImages: string[] = [];
  listBusiness: any[] = [];
  listShop: any[] = [];
  selectedShop: any;
  commissionDaymond: any = 0;
  commissionVendeur: any = 0;

  // Listes de tailles et dimensions
  sizes: string[] = [
    // Tailles de vêtements
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    // Tailles pour pantalons
    "28",
    "30",
    "32",
    "34",
    "36",
    // Tailles de chaussures (EU)
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    // Tailles pour équipements électroniques (pouces)
    "12 pouces",
    "14 pouces",
    "15 pouces",
    "17 pouces",
    "19 pouces",
  ];

  colors: { name: string; value: string }[] = [
    { name: "Noir", value: "#000000" },
    { name: "Bleu", value: "#0000FF" },
    { name: "Rouge", value: "#FF0000" },
    { name: "Orange", value: "#FFA500" },
    { name: "Rose", value: "#FFC0CB" },
    { name: "Violet", value: "#800080" },
    { name: "Vert", value: "#008000" },
    { name: "Jaune", value: "#FFFF00" },
    { name: "Blanc", value: "#FFFFFF" },
    { name: "Abricot", value: "#E67E30" },
    { name: "Acajou", value: "#88421D" },
    { name: "Aigue-marine", value: "#79F8F8" },
    { name: "Amande", value: "#82C46C" },
    { name: "Amarante", value: "#91283B" },
    { name: "Ambre", value: "#F0C300" },
    { name: "Améthyste", value: "#884DA7" },
    { name: "Anthracite", value: "#303030" },
    { name: "Argent", value: "#B1B1B1" },
    { name: "Asperge", value: "#8B9467" },
    { name: "Aubergine", value: "#5C005C" },
    { name: "Azur", value: "#007FFF" },
    { name: "Bambou", value: "#788B4B" },
    { name: "Bleu-ciel", value: "#87CEEB" },
    { name: "Bleu-gris", value: "#708090" },
    { name: "Bleu-marine", value: "#032B44" },
    { name: "Bleu-pastel", value: "#A1C9F2" },
    { name: "Bleu-turquoise", value: "#00BFFF" },
    { name: "Bourbon", value: "#8B4513" },
    { name: "Bronze", value: "#CD7F32" },
    { name: "Brun", value: "#786C3B" },
    { name: "Café", value: "#964B00" },
    { name: "Cannelle", value: "#F5DEB3" },
    { name: "Cendre", value: "#666666" },
    { name: "Cerise", value: "#FF0033" },
    { name: "Champagne", value: "#F7E2CE" },
    { name: "Chocolat", value: "#964B00" },
    { name: "Ciel", value: "#87CEEB" },
    { name: "Cinabre", value: "#E41B23" },
    { name: "Citron", value: "#FFFF00" },
    { name: "Cobalt", value: "#0047AB" },
    { name: "Cognac", value: "#F5DEB3" },
    { name: "Corail", value: "#FFC67D" },
    { name: "Crema", value: "#F5F5F5" },
    { name: "Cyan", value: "#00FFFF" },
    { name: "Doré", value: "#FFD700" },
    { name: "Ecru", value: "#F5F5F5" },
    { name: "Emeraude", value: "#008000" },
    { name: "Etain", value: "#B1B1B1" },
    { name: "Feuille", value: "#008000" },
    { name: "Fuchsia", value: "#FF00FF" },
    { name: "Gamboge", value: "#F2C464" },
    { name: "Gris", value: "#808080" },
    { name: "Gris-bleu", value: "#87A2B5" },
    { name: "Gris-foncé", value: "#333333" },
    { name: "Gris-taupe", value: "#A8D7F5" },
    { name: "Héliotrope", value: "#E6DAC3" },
    { name: "Indigo", value: "#4B0082" },
    { name: "Ivoire", value: "#FFFFF0" },
    { name: "Jade", value: "#00A86B" },
    { name: "Jaune-doré", value: "#F2C464" },
    { name: "Jaune-vert", value: "#C6F4D6" },
    { name: "Kaki", value: "#C3B091" },
    { name: "Lavande", value: "#C7B8EA" },
    { name: "Lierre", value: "#3E8E41" },
    { name: "Lilas", value: "#C9C3E6" },
    { name: "Limon", value: "#FFFF00" },
    { name: "Marron", value: "#786C3B" },
    { name: "Mauve", value: "#E0B0FF" },
    { name: "Miel", value: "#FFD700" },
    { name: "Moka", value: "#A52A2A" },
    { name: "Nacre", value: "#F5F5F5" },
    { name: "Nuit", value: "#000000" },
    { name: "Ocre", value: "#FF9900" },
    { name: "Olivier", value: "#3E8E41" },
    { name: "Orange-brun", value: "#FF9900" },
    { name: "Orange-foncé", value: "#FF4500" },
    { name: "Orange-pastel", value: "#FFC67D" },
    { name: "Paprika", value: "#FFC080" },
    { name: "Pêche", value: "#FFD7BE" },
    { name: "Perle", value: "#F5F5F5" },
    { name: "Pistache", value: "#C6F4D6" },
    { name: "Plomb", value: "#666666" },
    { name: "Plum", value: "#660066" },
    { name: "Raisin", value: "#5C005C" },
    { name: "Rouge-brun", value: "#8B0000" },
    { name: "Rouge-tomate", value: "#FF3737" },
    { name: "Rubis", value: "#E0115F" },
    { name: "Saphir", value: "#0065BD" },
    { name: "Sauge", value: "#BCE3C5" },
    { name: "Saumon", value: "#FFA07A" },
    { name: "Sépia", value: "#704214" },
    { name: "Sienna", value: "#A0522D" },
    { name: "Tournesol", value: "#FFD700" },
    { name: "Turquoise", value: "#00BFFF" },
    { name: "Violet-brun", value: "#7A00E6" },
    { name: "Violet-clair", value: "#C7B8EA" },
    { name: "Violet-foncé", value: "#6c5ce7" },
    { name: "Violet-pâle", value: "#C39BD3" },
    { name: "Violet-rose", value: "#E6DAC3" },
  ];

  // Liste des tailles et couleurs sélectionnées
  selectedSizes: string[] = [];
  selectedColors: Array<{ name: string; value: string }> = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly globalService: GlobalService,
    private readonly shopService: ShopService,
    private readonly produitsService: ProduitsService,
    private dialog: MatDialog,
    public utilisService: UtilisService
  ) {
    this.initializeForm();
  }
  private initializeForm(): void {
    this.productForm = this.fb.group({
      name: ["", Validators.required],
      state_id: ["", Validators.required],
      sub_title: [""],
      description: ["", Validators.required],
      price: ["", [Validators.required, Validators.min(0)]],
      //price_supplier: ["", [Validators.required, Validators.min(0)]],
      price_city_delivery: ["", [Validators.required, Validators.min(0)]],
      price_no_city_delivery: ["", [Validators.required, Validators.min(0)]],
      price_partner: ["", Validators.min(0)],
      // price_max: ["", Validators.min(0)],
      // price_min: ["", Validators.min(0)],
      price_normal: ["", Validators.min(0)],
      commission: [""],
      brand_id: [""],
      category: ["vente", Validators.required],
      sub_category_id: ["", Validators.required],
      stock: ["", Validators.required],
      shop_id: ["", Validators.nullValidator],
      popular: [false],
      publish: [true],
      link: [""],
      category_id: ["", Validators.required],
      // colors: [[], Validators.required], // Ajouté
      colors: this.fb.array([]), // Ajout du champ colors avec validation
    });
    // this.productForm.get("category")?.valueChanges.subscribe((category) => {
    //   this.selectedType = category;
    //   this.updatePriceValidators();
    // });
  }

  // private updatePriceValidators(): void {
  //   const priceMaxControl = this.productForm.get("price_max");
  //   const priceMinControl = this.productForm.get("price_min");
  //   const commissionControl = this.productForm.get("commission");

  //   if (this.selectedType === "grossiste") {
  //     priceMaxControl?.setValidators([Validators.required, Validators.min(0)]);
  //     priceMinControl?.setValidators([Validators.required, Validators.min(0)]);
  //     commissionControl?.clearValidators();
  //   } else {
  //     priceMaxControl?.clearValidators();
  //     priceMinControl?.clearValidators();
  //     commissionControl?.setValidators([
  //       Validators.required,
  //       Validators.min(0),
  //     ]);
  //   }

  //   priceMaxControl?.updateValueAndValidity();
  //   priceMinControl?.updateValueAndValidity();
  //   commissionControl?.updateValueAndValidity();
  // }

  onDaymondChange(event: any): void {
    if (event.target.value) {
      this.commissionVendeur = (event.target.value * 60) / 100;
    } else {
      this.commissionVendeur = 0;
    }

    console.log(event.target.value);
  }

  onShopChange(event: any): void {
    const shopId = event.target.value;
    this.productForm.patchValue({
      shop_id: shopId,
    });
  }

  // Méthode pour afficher l'image en grand
  viewImage(image: string): void {
    this.dialog.open(ImageDialogComponent, {
      data: { image },
      width: "80%",
      maxWidth: "600px",
    });
  }
  // Méthode pour supprimer une image de la prévisualisation
  removePreviewImage(index: number): void {
    this.previewImages.splice(index, 1);
    this.selectedImages.splice(index, 1);
  }

  onTypeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedType = selectElement.value;
  }

  // Méthode pour basculer l'état de favori
  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  initLoad(): void {
    Promise.all([
      this.loadShops(),
      this.loadCities(),
      this.loadStateProduct(),
      this.loadCategories(),
      this.loadBrand(),
    ]).catch((error) => {
      console.error("Erreur lors du chargement initial:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur de chargement",
        text: "Impossible de charger certaines données. Veuillez réessayer.",
      });
    });
  }

  onColorChange(event: any): void {
    const selectedColorValue = event.target.value;

    if (!selectedColorValue) return;

    const selectedColor = this.colors.find(
      (color) => color.value === selectedColorValue
    );

    if (
      selectedColor &&
      !this.selectedColors.some((c) => c.value === selectedColor.value)
    ) {
      const formattedColor = {
        name: selectedColor.name,
        value: selectedColor.value.startsWith("#")
          ? selectedColor.value
          : `#${selectedColor.value}`,
      };

      this.selectedColors = [...this.selectedColors, formattedColor];
      console.log("Couleurs sélectionnées:", this.selectedColors);
    }
  }

  // Dans Angular, avant l'envoi

  removeColor(colorValue: string): void {
    this.selectedColors = this.selectedColors.filter(
      (color) => color.value !== colorValue
    );

    // Mettez à jour le champ colors du formulaire
    this.productForm.patchValue({
      colors: this.selectedColors.map((color) => color.value),
    });
  }

  // Méthode appelée lors du changement de taille
  onSizeChange(event: any): void {
    const selectedSize = event.target.value;
    // Si la taille n'est pas déjà dans la liste, on l'ajoute
    if (selectedSize && !this.selectedSizes.includes(selectedSize)) {
      this.selectedSizes.push(selectedSize);
    }
  }

  ngOnInit() {
    this.initLoad();
    this.loadShops();
    this.loadCities();
    this.loadStateProduct();
    this.loadCategories();
    this.loadBrand();

    this.productForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      state_id: ["", Validators.required],
      sub_title: [""],
      price: ["", Validators.required],
      price_partner: ["", Validators.required],
      // price_supplier: ["", Validators.required],
      price_city_delivery: ["", Validators.required],
      price_no_city_delivery: ["", Validators.required],
      price_seller: ["", Validators.required],
      // price_max: ["", Validators.required],
      // price_min: ["", Validators.required],
      price_normal: ["", Validators.required],
      commission: ["", Validators.required],
      brand_id: [""],
      link: [""],
      category: ["vente", Validators.required],
      sub_category_id: ["", Validators.required],
      sizes: [""],
      colors: [""],
      stock: ["", Validators.required],
      shop_id: ["", Validators.required],
      city: [""],
      popular: [false],
      publish: [true],
      favorite: [false],
      category_id: ["", Validators.required],
      is_winning_product: [false], // par défaut désactivé
      winning_bonus_amount: [{ value: 25, disabled: true }], // fixe à 25
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const files = Array.from(input.files);
    const validImageTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/bmp",
      "image/svg+xml",
      "image/webp",
    ];

    // Vérifier si on n'excède pas 8 images au total
    if (this.selectedImages.length + files.length > 30) {
      Swal.fire({
        icon: "warning",
        title: "Trop d'images",
        text: "Vous ne pouvez pas sélectionner plus de 30 images au total.",
      });
      return;
    }
    if (this.selectedImages.length + files.length < 1) {
      Swal.fire({
        icon: "warning",
        title: "Pas assez d'images",
        text: "Vous ne pouvez pas sélectionner plus de 30 images au total.",
      });
      return;
    }

    for (const file of files) {
      if (!validImageTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Format non supporté",
          text: `Le format ${file.type} n'est pas supporté.`,
        });
        continue;
      }

      if (this.selectedImages.find((existing) => existing.name === file.name)) {
        continue; // Éviter les doublons
      }

      this.selectedImages.push(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImages.push(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  validateForm() {
    let isValid = true;
    Object.keys(this.productForm.controls).forEach((key) => {
      const control = this.productForm.get(key);
      if (control?.invalid) {
        console.log(
          `Le champ '${key}' est invalide. Erreurs :`,
          control.errors
        );
        isValid = false;
      }
    });
    return isValid;
  }

  onSubmit(): void {
    console.log("Vérification du formulaire...");
    this.isLoading = true;

    if (this.productForm.invalid) {
      Object.keys(this.productForm.controls).forEach((key) => {
        const control = this.productForm.get(key);
        if (control?.invalid) {
          console.log(
            `Le champ '${key}' est invalide. Erreurs :`,
            control.errors
          );
        }
      });
      console.log("Formulaire invalide");
      this.isLoading = false;
      return;
    }

    const formDataFinal = new FormData();
    const formData = this.productForm.value;
    formData.commission = this.commissionVendeur;

    // Ajout des autres champs du formulaire
    Object.keys(formData).forEach((key) => {
      if (
        formData[key] !== null &&
        formData[key] !== undefined &&
        key !== "colors"
      ) {
        formDataFinal.append(key, formData[key]);
      }
    });

    // Ajout des images
    this.selectedImages.forEach((file, index) => {
      formDataFinal.append(`images[${index}]`, file);
    });

    // Gestion des couleurs - Structure spécifique pour Laravel
    if (this.selectedColors && this.selectedColors.length > 0) {
      this.selectedColors.forEach((color, index) => {
        formDataFinal.append(`colors[${index}][name]`, color.name);
        formDataFinal.append(
          `colors[${index}][value]`,
          color.value.startsWith("#") ? color.value : `#${color.value}`
        );
      });

      // Log pour debug
      console.log("Colors being sent:", this.selectedColors);
    } else {
      console.error("Aucune couleur sélectionnée");
      return;
    }

    // Log du FormData final
    formDataFinal.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    // Récupération du statut "produit gagnant" depuis ton formulaire
    const isWinning = this.productForm.get("isWinning")?.value;

    // Ajout des infos dans formDataFinal
    if (isWinning) {
      formDataFinal.append("is_winning_product", "1");
      formDataFinal.append("winning_bonus_amount", "25");
    } else {
      formDataFinal.append("is_winning_product", "0");
    }

    // Envoi des données
    this.produitsService.create(formDataFinal).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Produit ajouté avec succès",
          showConfirmButton: false,
          timer: 2000,
        });
        this.router.navigate(["/distribution/produits"]);
      },
      error: (error: any) => {
        this.isLoading = false;
        console.log("Réponse complète de l'API :", error);
        const errorMessage =
          error?.error?.message ||
          "Une erreur s'est produite lors de l'ajout du produit.";
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Erreur lors de l'ajout du produit",
          text: errorMessage,
          showConfirmButton: true,
        });
      },
    });
  }

  loadShops(): void {
    this.shopService.getAll().subscribe({
      next: (response: any) => {
        this.utilisService.response(response, (d: any) => {
          console.log("Liste des Boutiques", d.data);
          this.listShop = d.data;
        });
      },
      error: (error: any) => {
        console.error(
          "Erreur lors de la récupération de la liste des entreprises",
          error
        );
      },
    });
  }

  loadCities(): void {
    this.globalService.getCities().subscribe({
      next: (res: any) => {
        this.utilisService.response(res, (d: any) => {
          console.log("Ville :", d.data);
          if (d.data) {
            this.listCities = ensureArray(d.data);
          }
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  loadStateProduct(): void {
    this.globalService.getState().subscribe({
      next: (res: any) => {
        this.utilisService.response(res, (d: any) => {
          console.log("Etat :", d.data);
          if (d.data) {
            this.listStates = ensureArray(d.data);
          }
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  loadCategories(): void {
    this.globalService.getCat().subscribe({
      next: (res: any) => {
        this.utilisService.response(res, (d: any) => {
          console.log("Catégorie :", d.data);
          if (d.data) {
            this.listCategories = ensureArray(d.data);
          }
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onCategoryChange(event: Event): void {
    const categoryId = +(event.target as HTMLSelectElement).value;
    const selectedCategory = this.listCategories.find(
      (cat) => cat.id === categoryId
    );

    if (selectedCategory) {
      this.listSubCategories = selectedCategory.sub_categories || [];
      this.productForm.patchValue({
        sub_category_id: "",
        category_id: categoryId,
      });
    }
  }

  loadBrand(): void {
    this.globalService.getBrand().subscribe({
      next: (res: any) => {
        this.utilisService.response(res, (d: any) => {
          console.log("Brands :", d.data);
          if (res.data) {
            this.listBrand = ensureArray(d.data);
          }
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  // Méthode déclenchée lorsqu'une boutique est sélectionnée
  onSelectChange(event: any): void {
    this.selectedBoutique = event.target.value;
  }

  // Pour gérer l'affichage bonus si activé
  onWinningProductChange() {
    const isWinning = this.productForm.get("is_winning_product")?.value;
    if (isWinning) {
      this.productForm.get("winning_bonus_amount")?.enable();
    } else {
      this.productForm.get("winning_bonus_amount")?.disable();
    }
  }

  // Récupérer les valeurs pour envoyer au backend
  submitProduct() {
    const payload = this.productForm.getRawValue(); // récupère winning_bonus_amount même s'il est disabled
    // appel API POST/PUT
  }
}
