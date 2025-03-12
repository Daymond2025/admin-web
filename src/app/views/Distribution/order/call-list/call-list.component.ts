import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { OrderService } from 'src/app/shared/services/Order.service';
import { UtilisService } from 'src/app/shared/services/Utilis.service';

@Component({
  selector: 'app-call-list',
  standalone: true, // Standalone component
  templateUrl: './call-list.component.html',
  styleUrls: ['./call-list.component.css'],
  imports:[CommonModule , TruncatePipe ]
})
export class sCallListComponent {
  isLoading: boolean = false;
  filterStatus: string = "new"; // Default filter
  selectedOrder: any; // Selected order
  reason: string = ""; // Cancellation reason

  // Pagination variables
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 5;

  dataset:any=[]
  ladata:any

  constructor(
    public utilisService: UtilisService,
    private orderService : OrderService,
    private router: Router,
  ){}

  ngOnInit(): void {
    // this.getProd({size:10,page:0})
    this.getProd({page:1,status:'new'})
  }

  getProd(obj:any){
    this.orderService.getAllCallCenter(obj).subscribe({
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

  loadOrders(page: number = 1, status: string = this.filterStatus): void {
    this.isLoading = true;
    // Simulate an API call for loading orders (to be implemented)
  }

  filterByNewOrders(): void {
    this.filterStatus = "new";
    this.loadOrders(1, this.filterStatus);
  }

  filterByReportedOrders(): void {
    this.filterStatus = "postpone";
    this.loadOrders(1, this.filterStatus);
  }

  filterByCancelledOrders(): void {
    this.filterStatus = "canceled_by_admin";
    this.loadOrders(1, this.filterStatus);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadOrders(page);
    }
  }

  changeOrderStatus(orderId: number, newStatus: string, reason?: string): void {
    if (newStatus === "canceled_by_admin" && !reason) {
      alert("Veuillez fournir un motif d'annulation.");
      return;
    }
    this.isLoading = true;
    // API call to change order status (to be implemented)
  }

  submitCancellation(): void {
    if (!this.reason) {
      alert("Veuillez sélectionner un motif.");
      return;
    }
    this.changeOrderStatus(this.selectedOrder.id, "canceled_by_admin", this.reason);
  }

  selectOrderForCancellation(order: any): void {
    this.selectedOrder = order;
    this.reason = ""; // Reset reason
  }

  selectReason(selectedReason: string): void {
    this.reason = selectedReason;
  }

  openDialog(data?:any) {
    this.router.navigate(['/orders/details_coord'] , { state: data })
  }
}
