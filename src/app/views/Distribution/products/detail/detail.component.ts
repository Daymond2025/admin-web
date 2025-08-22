import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
// import { UrlConstant } from "src/app/core/constants/url_constants";
import { ensureArray } from "src/app/core/utils/verif-data.utils";
// import { IDataResponse } from "src/app/core/interfaces/data_response";
// import { IProduct } from "src/app/core/interfaces/product.interface";
// import { ApiService } from "src/app/core/services/api.service";
// import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { ProduitsService } from "src/app/shared/services/Produits.service";
import { CommonModule } from "@angular/common";
import { TruncatePipe } from "src/app/shared/pipes/truncate.pipe";
import { UtilisService } from "src/app/shared/services/Utilis.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BackButtonComponent } from "src/app/back-button/back-button.component";
import { MatInputModule } from "@angular/material/input";
import { Clipboard } from "@angular/cdk/clipboard";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
  standalone: true, // Standalone component
  imports: [
    CommonModule,
    TruncatePipe,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BackButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class DetailComponent implements OnInit {
  product!: any;
  isLoading: boolean = true;
  selectedImage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private produitsService: ProduitsService,
    private router: Router, // Ajoutez cette ligne,
    public utilisService: UtilisService,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadProductDetail();
  }

  // getProd(obj:any){
  //   this.orderService.getAllCallCenter(obj).subscribe({
  //     next: (data) => {
  //       this.utilisService.response(data, (d:any) => {
  //         console.log('order',d)
  //         // this.loading = false
  //         this.dataset=d.data;
  //         // this.total = d.totalItems
  //       });
  //     },
  //     error: (error) => {
  //       this.utilisService.response(error,(d:any)=>{

  //       })
  //     },
  //   });
  // }

  loadProductDetail(): void {
    const productId = this.route.snapshot?.paramMap.get("id");
    if (productId) {
      this.produitsService.getById(`${productId}`).subscribe({
        next: (data) => {
          this.utilisService.response(data, (d: any) => {
            if (d.data) {
              this.product = ensureArray(d.data)[0];
              this.isLoading = false;
              console.log(this.product);
            } else {
              console.error("No content found in response");
            }
          });
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
        },
      });
    } else {
      console.error("Product ID is missing");
      this.isLoading = false;
    }
  }

  // Ouvrir le modal avec l'image sélectionnée
  openImageModal(image: string): void {
    this.selectedImage = image;
  }

  // Fermer le modal en cliquant n'importe où
  closeImageModal(): void {
    this.selectedImage = null;
  }

  // Méthode pour "Masquer" le produit
  hideProduct(): void {
    this.openReasonModal("Masquer");
  }

  // Méthode pour marquer comme "Non conforme"
  markAsNonCompliant(): void {
    this.openReasonModal("Non conforme");
  }

  // Ouvrir le popup pour entrer la raison
  openReasonModal(action: string): void {
    Swal.fire({
      title: `Raison de ${action}`,
      input: "text",
      inputPlaceholder: "Entrez la raison...",
      showCancelButton: true,
      confirmButtonText: "Soumettre",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.submitStatusChange(action, result.value);
      }
    });
  }

  // Soumettre la requête au serveur
  submitStatusChange(action: string, reason: string): void {
    const formData = new FormData();
    formData.append("product_id", this.product.id.toString());
    formData.append("reason_disapproved", reason);
    formData.append("publish", "false");

    this.produitsService.createOrNo(formData).subscribe({
      next: (response) => {
        Swal.fire({
          title: "Succès",
          text: `Le statut a été mis à jour avec succès!`,
          icon: "success",
          confirmButtonText: "OK",
        });
      },
      error: (error) => {
        Swal.fire({
          title: "Erreur",
          text: `Une erreur est survenue: ${
            error.message || "Veuillez réessayer."
          }`,
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Error updating status", error);
      },
    });
  }

  //generatedLink: string | null = null;

  //generateAndHandleLink(productId: number) {
  //console.log(
  //"🔍 Lancement de la génération de lien pour le produit :",
  //productId
  //);

  //this.produitsService.generateProductLink(productId).subscribe({
  //next: (res: any) => {
  //console.log("✅ Réponse reçue du backend :", res);

  // selon si tu fais observe: 'response' ou pas
  //const link = res?.body?.link || res?.link;
  //if (link) {
  //this.generatedLink = link;
  //console.log("📎 Lien généré :", this.generatedLink);
  //this.snackBar.open("Lien généré avec succès !", "Fermer", {
  //duration: 3000,
  //});
  //} else {
  //console.warn("⚠️ Aucun lien trouvé dans la réponse :", res);
  //this.snackBar.open("Réponse sans lien", "Fermer", { duration: 3000 });
  //}
  //},
  //error: (err: any) => {
  //console.error("❌ Erreur lors de la génération du lien :", err);
  //this.snackBar.open("Erreur lors de la génération du lien", "Fermer", {
  //duration: 3000,
  //});
  //},
  //});
  //}

  //copyLinkToClipboard() {
  //if (this.generatedLink) {
  //navigator.clipboard.writeText(this.generatedLink).then(() => {
  //console.log("📋 Lien copié !");
  //});
  //}
  //}

  // deleteProduct(): void {
  //   Swal.fire({
  //     title: 'Confirmation',
  //     text: 'Voulez-vous vraiment supprimer ce produit ?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Oui, supprimer',
  //     cancelButtonText: 'Annuler'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const productId = this.product.id.toString();
  //       this.apiService.delete(`${UrlConstant.PRODUCTS_URL}/${productId}/delete`).subscribe(
  //         (response) => {
  //           Swal.fire({
  //             title: 'Succès',
  //             text: 'Le produit a été supprimé avec succès',
  //             icon: 'success',
  //             confirmButtonText: 'OK'
  //           });
  //           // Redirection ou autre logique après suppression
  //         },
  //         (error) => {
  //           Swal.fire({
  //             title: 'Erreur',
  //             text: `Erreur lors de la suppression: ${error.message || 'Veuillez réessayer.'}`,
  //             icon: 'error',
  //             confirmButtonText: 'OK'
  //           });
  //           console.error('Erreur suppression', error);
  //         }
  //       );
  //     }
  //   });
  // }

  toggleWinningProduct(event: Event, product: any) {
    const isChecked = (event.target as HTMLInputElement).checked;

    // Appel HTTP pour mettre à jour le produit
    this.http
      .put(`/api/v2/products/${product.id}`, {
        is_winning_product: isChecked,
        winning_bonus_amount: 25,
      })
      .subscribe({
        next: (res: any) => {
          product.is_winning_product = isChecked;
          console.log("Produit gagnant mis à jour avec succès");
        },
        error: (err: any) => {
          console.error("Erreur lors de la mise à jour du produit", err);
        },
      });
  }

  deleteProduct(): void {
    Swal.fire({
      title: "Confirmation",
      text: "Voulez-vous vraiment supprimer ce produit ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        const productId = this.product.id.toString();
        this.produitsService.delete(`${productId}`).subscribe({
          next: (response) => {
            Swal.fire({
              title: "Succès",
              text: "Le produit a été supprimé avec succès",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              // Redirection après que l'utilisateur a cliqué sur OK
              this.router.navigate(["distribution/produits"]); // Redirection vers la page d'accueil
            });
          },
          error: (error) => {
            Swal.fire({
              title: "Erreur",
              text: `Erreur lors de la suppression: ${
                error.message || "Veuillez réessayer."
              }`,
              icon: "error",
              confirmButtonText: "OK",
            });
            console.error("Erreur suppression", error);
          },
        });
      }
    });
  }
}
