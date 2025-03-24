import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/Order.service';
import { UtilisService } from 'src/app/shared/services/Utilis.service';

@Component({
  selector: 'app-cord-list',
  standalone: true, // Standalone component
  templateUrl: './cord-list.component.html',
  styleUrls: ['./cord-list.component.css'],
  imports:[CommonModule ]
})
export class sCordListComponent {
  // Component logic (to be implemented)
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
      this.router.navigate(['/orders/details_coord'] , { state: data })
    }
}
