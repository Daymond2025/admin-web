import { CommonModule } from "@angular/common";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
// import { UrlConstant } from "src/app/core/constants/url_constants";
import { ensureArray } from "src/app/core/utils/verif-data.utils";
// import { IBusiness } from "src/app/core/interfaces/business.interface";
// import { ICity } from "src/app/core/interfaces/country-city.interface";
// import { IDataResponse } from "src/app/core/interfaces/data_response";
// import { IProduct } from "src/app/core/interfaces/product.interface";
// import { IDetailsShop } from "src/app/core/interfaces/shop.interface";
// import { ApiService } from "src/app/core/services/api.service";
import { ImageDialogComponent } from "src/app/shared/components/image-dialog/image-dialog.component";
import { TruncatePipe } from "src/app/shared/pipes/truncate.pipe";
import { GlobalService } from "src/app/shared/services/Global.service";
import { ProduitsService } from "src/app/shared/services/Produits.service";
import { ShopService } from "src/app/shared/services/Shop.service";
import { UtilisService } from "src/app/shared/services/Utilis.service";
// import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Component({
  selector: "app-publish",
  templateUrl: "./publish.component.html",
  styleUrls: ["./publish.component.css"],
  standalone: true, // Standalone component
  imports:[CommonModule , TruncatePipe , RouterModule , FormsModule , ReactiveFormsModule]
})
export class PublishComponent implements OnInit {
  productId!: string;
  product!: any;
  selectedImage: string | null = null;
  // Listes de tailles et couleurs
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
  productForm!: FormGroup;
  selectedBoutique: any;
  listCities!: any[];
  listStates: any[] = [];
  listCategories: any[] = [];
  selectedCategoryId: number | null = null;
  listSubCategories: any[] = [];
  listBrand: any[] = [];
  selectedType: string = "grossiste";
  @ViewChild("boutiquePopup") boutiquePopup!: TemplateRef<any>;
  popupVisible: boolean = false;
  isLoading: boolean = false;
  isFavorite: boolean = false;
  selectedImages: File[] = [];
  previewImages: string[] = [];
  listBusiness: any[] = [];
  listShop: any[] = [];
  selectedShop: any;

  // Liste des tailles et couleurs sélectionnées
  selectedSizes: string[] = [];
  selectedColors: Array<{name: string, value: string}> = [];

  constructor(
    private readonly fb: FormBuilder,
    private route: ActivatedRoute,
    private produitsService: ProduitsService,
    private router: Router,
    private dialog: MatDialog,
    private readonly globalService: GlobalService,
    private readonly shopService : ShopService,
    public utilisService: UtilisService
  ) {
    this.productForm = this.fb.group({
      name: ["" ],
      state_id: [""],
      sub_title: [""],
      description: [""],
      price: ["", Validators.min(0)],
      price_supplier: ["", Validators.min(0)],
      price_city_delivery: ["",  Validators.min(0)],
      price_no_city_delivery: ["", Validators.min(0)],
      price_seller: ["", Validators.min(0)],
      price_max: ["", Validators.min(0)],
      price_min: ["", Validators.min(0)],
      price_normal: ["", Validators.min(0)],
      commission: ["", Validators.min(0)],
      brand_id: [""],
      category: ["grossiste"],
      sub_category_id: [""],
      stock: [""],
      shop_id: [""],
      popular: [false],
      publish: [true],
      category_id: [""],
      // colors: [[], Validators.required], // Ajouté
      colors: this.fb.array([]), // Ajout du champ colors avec validation
    });
    this.productForm.get("category")?.valueChanges.subscribe((category) => {
      this.selectedType = category;
      this.updatePriceValidators();
    });
  }
  private updatePriceValidators(): void {
    const priceMaxControl = this.productForm.get("price_max");
    const priceMinControl = this.productForm.get("price_min");
    const commissionControl = this.productForm.get("commission");

    if (this.selectedType === "grossiste") {
      priceMaxControl?.setValidators([Validators.required, Validators.min(0)]);
      priceMinControl?.setValidators([Validators.required, Validators.min(0)]);
      commissionControl?.clearValidators();
    } else {
      priceMaxControl?.clearValidators();
      priceMinControl?.clearValidators();
      commissionControl?.setValidators([
        Validators.required,
        Validators.min(0),
      ]);
    }

    priceMaxControl?.updateValueAndValidity();
    priceMinControl?.updateValueAndValidity();
    commissionControl?.updateValueAndValidity();
  }
  ngOnInit(): void {
    this.initLoad();
    this.productId = this.route.snapshot?.paramMap.get("id") || "";
    this.loadShops();
    this.loadCategories();
    this.loadStateProduct();
    this.loadCities();
    this.loadBrand();
    if (this.productId) {
      this.getProductById(this.productId);
    } else {
      console.error("ID du produit manquant");
      this.isLoading = false;
    }
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
  onShopChange(event: any): void {
    const shopId = event.target.value;
    this.productForm.patchValue({
      shop_id: shopId,
    });
  }
  viewImage(image: string): void {
    this.dialog.open(ImageDialogComponent, {
      data: { image },
      width: "80%",
      maxWidth: "600px",
    });
  }
  removeImage(index: number): void {
    this.previewImages.splice(index, 1);
    this.selectedImages.splice(index, 1);
  }
  onTypeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedType = selectElement.value;
  }
  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }
  onColorChange(event: any): void {
    const selectedColorValue = event.target.value;
    
    if (!selectedColorValue) return;
    
    const selectedColor = this.colors.find(color => color.value === selectedColorValue);
    
    if (selectedColor && !this.selectedColors.some(c => c.value === selectedColor.value)) {
      const formattedColor = {
        name: selectedColor.name,
        value: selectedColor.value.startsWith('#') ? selectedColor.value : `#${selectedColor.value}`
      };
      
      this.selectedColors = [...this.selectedColors, formattedColor];
      console.log('Couleurs sélectionnées:', this.selectedColors);
    }
  }
  removeColor(colorValue: string): void {
    this.selectedColors = this.selectedColors.filter(color => color.value !== colorValue);
  
    // Mettez à jour le champ colors du formulaire
    this.productForm.patchValue({
      colors: this.selectedColors.map(color => color.value),
    });
  }
  onSizeChange(event: any): void {
    const selectedSize = event.target.value;
    // Si la taille n'est pas déjà dans la liste, on l'ajoute
    if (selectedSize && !this.selectedSizes.includes(selectedSize)) {
      this.selectedSizes.push(selectedSize);
    }
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
    if (this.selectedImages.length + files.length > 8) {
      Swal.fire({
        icon: "warning",
        title: "Trop d'images",
        text: "Vous ne pouvez pas sélectionner plus de 8 images au total.",
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
  // onFileSelected(event: any) {
  //   const files = event.target.files;
  //   if (this.selectedImages.length + files.length > 12) {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Too many images',
  //       text: 'Maximum 8 images allowed'
  //     });
  //     return;
  //   }

  //   Array.from(files).forEach(file => {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.previewImages.push(e.target.result);
  //     };
  //     reader.readAsDataURL(file as Blob);
  //     this.selectedImages.push(file as File);
  //   });
  // }
  validateForm() {
    let isValid = true;
    Object.keys(this.productForm.controls).forEach((key) => {
      const control = this.productForm.get(key);
      if (control?.invalid) {
        console.log(`Le champ '${key}' est invalide. Erreurs :`, control.errors);
        isValid = false;
      }
    });
    return isValid;
  }
  loadShops(): void {
    this.shopService.getAll().subscribe(
     {next : (response: any) => {
      this.utilisService.response(response, (d:any) => {
        console.log("Liste des Boutiques", d.data);
        this.listShop = d.data;
      })
        
      },
     error : (error: any) => {
        console.error(
          "Erreur lors de la récupération de la liste des entreprises",
          error
        );
      }}
    );
  }
  loadCities(): void {
    this.globalService.getCities().subscribe({
      next:(res: any) => {
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
  loadStateProduct(): void {
    this.globalService.getState().subscribe(
      {next:(res: any) => {
        this.utilisService.response(res, (d:any) => {
          console.log("Etat :", d.data);
          if (d.data) {
            this.listStates = ensureArray(d.data);
          }
        })
      
      },
     error : (error) => {
        console.error(error);
      }}
    );
  }
  loadCategories(): void {
    this.globalService
      .getCat()
      .subscribe(
       {next : (res: any) => {
        this.utilisService.response(res, (d:any) => {
          console.log("Catégorie :", d.data);
          if (d.data) {
            this.listCategories = ensureArray(d.data);
          }
        })
         
        },
       error : (error) => {
          console.error(error);
        }}
      );
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
    this.globalService.getBrand().subscribe(
   {  next : (res: any) => {
    this.utilisService.response(res, (d:any) => {
      console.log("Brands :", d.data);
      if (res.data) {
        this.listBrand = ensureArray(d.data);
      }
    })
       
      },
     error : (error) => {
        console.error(error);
      }}
    );
  }
  onSelectChange(event: any): void {
    this.selectedBoutique = event.target.value;
  }
  getProductById(productId: string): void {
    // Appel API pour récupérer le produit par son ID
    this.produitsService.getById(`${productId}`).subscribe(
     { next :(response: any) => {
      this.utilisService.response(response, (d:any) => {
        console.log("Produit récupéré avec succès", d);
        this.product = d.data;
        console.log("Produit :", this.product);
        console.log("Produit AAAAA:", d.data);

        this.isLoading = false;

        // Utilisation de patchValue() pour pré-remplir le formulaire
        this.productForm.patchValue({
          name: this.product.name,
          state_id: this.product.state.id,
          sub_title: this.product.sub_title,
          description: this.product.description,
          price: this.product.price.price,
          price_partner: this.product.price.partner,
          price_supplier: this.product.price.supplier,
          price_city_delivery: this.product.price_delivery.city,
          price_no_city_delivery: this.product.price_delivery.no_city,
          price_seller: this.product.price.seller,
          price_max: this.product.price.max,
          price_min: this.product.price.min,
          price_normal: this.product.price.normal,
          commission: this.product.price.commission,
          product_id: this.product.code,
          brand_id: this.product.brand,
          category: this.product.category.name,
          sub_category_id: this.product.sub_category?.name,
          category_id: this.product.category?.id,
          stock: this.product.stock,
          shop_id: this.product.shop.id || "2", // Valeur par défaut si manquante
          publish: this.product.publish,
          colors: this.product.colors,
          sizes: this.product.sizes,
          popular: this.product.popular,
          star: this.product.star,
          images: this.product.images,
        });
        console.log("Form values", this.productForm.value);
      })
       
      },
      error : (error: any) => {
        console.error("Erreur lors de la récupération du produit", error);
        this.isLoading = false;
      }}
    );
    this.isLoading = false;
  }
  publishProduct(): void {
    this.isLoading = true;

    // Vérification de la validité du formulaire
    if (this.productForm.invalid || !this.productForm.get("category")?.value) {
      alert("Veuillez remplir tous les champs requis, y compris la catégorie.");
      this.isLoading = false;
      return; // Annuler la soumission si le formulaire est invalide
    }

    // Vérification spécifique pour la catégorie "grossiste"
    if (this.productForm.get("category")?.value === "grossiste") {
      if (!this.productForm.get("price_max")?.value) {
        alert(
          "Le champ 'Prix maximum' est requis pour la catégorie 'grossiste'."
        );
        this.isLoading = false;
        return; // Annuler la soumission si le champ est vide
      }
    }

    // Assurez-vous que sub_category_id est un nombre
    if (this.productForm.get("sub_category_id")?.value) {
      this.productForm.patchValue({
        sub_category_id: Number(this.productForm.get("sub_category_id")?.value),
      });
    }

    const payload = {
      shop_id: this.productForm.get("shop_id")?.value,
      sub_category_id: this.productForm.get("sub_category_id")?.value,
      category: this.productForm.get("category")?.value, // Ajout de category
      // Ajoutez d'autres champs nécessaires ici
    };

    console.log("Payload avant publication:", payload); // Ajout de log
    console.log("Catégories disponibles:", this.listCategories); // Log des catégories
    console.log("Sous-catégories disponibles:", this.listSubCategories); // Log des sous-catégories

    this.produitsService
      .publish(payload,this.productId)
      .subscribe(
       {next : (response: any) => {
          console.log("Produit publié avec succès", response);
          this.isLoading = false;

          Swal.fire({
            icon: "success",
            title: "Produit publié avec succès",
            showConfirmButton: true,
          }).then(() => {
            this.router.navigate(["/products"]);
          });
        },
       error : (error: any) => {
          console.error("Erreur lors de la publication du produit", error);
          this.isLoading = false;

          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: error?.message || "Impossible de publier le produit.",
          });
        }}
      );
  }
  onSubmit(): void {
    this.isLoading = true;

    // Vérification de la validité du formulaire
    if (this.productForm.invalid) {
      alert("Veuillez remplir tous les champs requis.");
      this.isLoading = false; // Ajout de cette ligne pour arrêter le chargement
      return; // Annuler la soumission si le formulaire est invalide
    }

    // Création d'une instance de FormData
    const formData = new FormData();

    // Ajouter les données du formulaire au FormData seulement si elles ne sont pas vides
    Object.keys(this.productForm.controls).forEach((key) => {
      const value = this.productForm.get(key)?.value;
      if (value) {
        formData.append(key, value);
      }
    });

    // Assurez-vous que les champs requis sont ajoutés
    formData.append("shop_id", this.productForm.get("shop_id")?.value);
    formData.append(
      "sub_category_id",
      this.productForm.get("sub_category_id")?.value
    );
    formData.append("category", this.productForm.get("category")?.value);
    formData.append("category", this.productForm.get("category")?.value);
    formData.append("stock", this.productForm.get("stock")?.value);
    formData.append("name", this.productForm.get("name")?.value); // Ajout du champ name
    formData.append("description", this.productForm.get("description")?.value); // Ajout du champ description
    formData.append(
      "price_supplier",
      this.productForm.get("price_supplier")?.value
    ); // Ajout du champ price_supplier
    formData.append("price", this.productForm.get("price")?.value); // Ajout du champ price
    formData.append("price_city", this.productForm.get("price_city")?.value); // Ajout du champ price_city
    formData.append(
      "price_no_city",
      this.productForm.get("price_no_city")?.value
    ); // Ajout du champ price_no_city
    formData.append("images", JSON.stringify(this.selectedImages)); // Assurez-vous que les images sont ajoutées correctement

    // Envoi des données au serveur
    this.produitsService
      .create(
        
        formData
      )
      .subscribe(
        {next : (response: any) => {
          this.utilisService.response(response, (d:any) => {})
          console.log("Produit ajouté avec succès", response);
          this.isLoading = false;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Produit ajouté avec succès",
            showConfirmButton: false,
            timer: 2000,
          });
          this.router.navigate(["/products"]);
        },
        error :(error: any) => {
          console.error("Erreur lors de l'ajout du produit", error);
          this.isLoading = false;
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
        }}
      );
  }
}
