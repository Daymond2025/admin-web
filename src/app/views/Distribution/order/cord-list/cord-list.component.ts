import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/Order.service';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import Swal from 'sweetalert2'; // ⬅️ En haut du fichier

@Component({
  selector: 'app-cord-list',
  standalone: true, // Standalone component
  templateUrl: './cord-list.component.html',
  styleUrls: ['./cord-list.component.css'],
  imports:[CommonModule ]
})
export class sCordListComponent {
  // Component logic (to be implemented)
  isLoading: boolean = false; //
  dataset:any=[]
  ladata:any
  filterStatus:any=''
    constructor(
      public utilisService: UtilisService,
      private orderService : OrderService,
      private router: Router,
    ){}
  
    ngOnInit(): void {
      this.getProd({size:10,page:0})
      
    }
  
    getProd(obj:any){
      this.orderService.getAll(obj).subscribe({
        next: (data) => {
          this.utilisService.response(data, (d:any) => {
            console.log('order',d)
            // this.loading = false
            this.dataset=d.data;
            // this.total = d.totalItems
          });
        },
        error: (error) => {
          this.utilisService.response(error,(d:any)=>{
      
          })
        },
      });
    }

    public getButtonText(status: string): string {
      switch (status) {
        case 'confirm':
          return 'Nouvelle commande';
        case 'in_progress':
          return 'Commande en cours';
        case 'canceled':
          return 'Commande annulée';
        case 'pending':
          return 'Commande en attente';  
        case 'validated':
          return 'Commande validée';
        default:
          return 'Statut inconnu';
      }
    }

    public getButtonColor(status: string): string {
      switch (status) {
        case 'confirm':
          return 'green';
        case 'in_progress':
          return 'orange';
        case 'canceled':
          return 'red';
        case 'validated':
          return 'blue';
        case 'pending':
          return 'purple';
        default:
          return 'gray';
      }
    }

    handleFilter(status:any){
      this.filterStatus=status
      this.getProd({size:10,page:0,status:status})
    }

    openDialog(data?:any) {
      this.router.navigate(['distribution/commandes/details_coord'] , { state: data })
    }

    syncStatusToSellerFromList(orderId: number): void {
      this.isLoading = true;
    
      this.orderService.syncStatusToSeller(orderId).subscribe({
        next: (data) => {
          this.utilisService.response(data, (d: any) => {
            this.isLoading = false;
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Statut propagé au vendeur avec succès.',
              showConfirmButton: false,
              timer: 1500,
            });
            this.getProd({ page: 1, status: this.filterStatus });
          });
        },
        error: (error) => {
          this.utilisService.response(error, (d: any) => {
            this.isLoading = false;
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: d?.error?.message || "Erreur lors de la propagation",
              showConfirmButton: false,
              timer: 1500,
            });
          });
        }
      });
    }
    
}
