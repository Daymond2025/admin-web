import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/Order.service';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cord-detail',
  standalone: true, // Important pour les composants standalone
  templateUrl: './cord-detail.component.html',
  styleUrls: ['./cord-detail.component.css'],
  imports:[CommonModule ,ReactiveFormsModule,
      FormsModule, ]
})
export class CordDetailComponent {
  // Logique du composant (à implémenter)
  order:any
  itemForm!: FormGroup
  total:any=0
  loading:boolean = false
  steps = [
    { label: "Confirmé", date: "", completed: false, visible: true , status : "confirmed" },
    { label: "En attente", date: "", completed: false, visible: true , status : "pending"  },
    { label: "En cours", date: "", completed: false, visible: true , status : "in_progress"  },
    { label: "Validé", date: "", completed: false, visible: true , status : "validated"  },
    // { label: "Annulée", date: "", completed: false, visible: true },
  ];
  currentStep: number = 1;
  

  constructor(
        public utilisService: UtilisService,
        private orderService : OrderService,
        private router: Router,
        private fb: FormBuilder,
      ){}
  ngOnInit() {
    
      const orderData = history.state;
      console.log(orderData); 
      if (!orderData || Object.keys(orderData).length === 0) {
        console.error("Aucune donnée reçue depuis l'historique.");
        // return;
      }
      else{
        this.order=orderData;
        this.total = this.order?.items[0]?.total
      }
      
    
   
    this.buildForm();
  }

  buildForm() {
        
        this.itemForm = this.fb.group({
          quantity:[ this.order ? this.order?.items[0].quantity : 0 ,[Validators.required]],
          orderproductprice:[ this.order ? this.order?.items[0]?.price :0 ,[Validators.required]],
          commissioninitiale:[ this.order && this.order?.items[0].commission_initiale == 1 ? this.order?.items[0].product?.price?.commission : this.order?.items[0].commission_initiale ,[Validators.required]],
          commissionsupplementaire:[ this.order ? this.order?.items[0].commission - this.order?.items[0].product?.price?.commission :0 ,[Validators.required]],
          detail:[ this.order ? this.order?.detail :'' ,[Validators.required]],
          commission_applied:0,
          status:"",
          
        })
      }

  handleChange(){
    let res = this.itemForm.value;
    console.log('laform ',res)
    this.total = res.quantity*res.orderproductprice + res.commissioninitiale + res.commissionsupplementaire
  }

  handleOk(status:any){
    let res = this.itemForm.value;
    res.commission = res.commissioninitiale + res.commissionsupplementaire
    res.id = this.order.id
    if(status != null){res.status = status}
    
    
    res.commission_applied = 1
    console.log('==envoie== ',res)
    this.updateOrder(res)
  }

  handleChangeStatus(status:any , label:any){
    Swal.fire({
      title: "Êtes-vous sûr(e) ?",
      text: "Mettre la commande en "+label,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, changer le statut",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateOrder({
          id: this.order.id,
          status: status,
         })
      }
    });

  }

  updateOrder(annonce: any){
        console.log(annonce)
       
          this.orderService.update(annonce).subscribe({
            next: (data) => {
              this.utilisService.response(data, (d: any) => {
                this.loading=false
                // this.fermer()
               Swal.fire({
                                 position: 'center',
                                 icon: 'success',
                                 title: 'La commande a bien été mise a jour',
                                 showConfirmButton: false,
                                 timer: 1500,
                               });
              });
            },
            error: (error) => {
          this.utilisService.response(error,(d:any)=>{
            this.loading=false
            Swal.fire({
                              position: 'center',
                              icon: 'warning',
                              title: d?.error?.message,
                              showConfirmButton: false,
                              timer: 1500,
                            });
       
          })
        },
          })
       
      }
    
  

      updateSteps() {
        if (!this.order || !this.order.status) {
          console.warn("L'objet order est null ou ne contient pas de statut.");
          return;
        }
      
        const statusMap = {
          confirm: 1,
          pending: 2,
          in_progress: 3,
          validated: 4,
        } as const;
      
        const status = this.order.status as keyof typeof statusMap;
        const stepIndex = statusMap[status] || 0; 
      
        this.currentStep = stepIndex;
      
        this.steps.forEach((step, index) => {
          if (index < stepIndex) {
            step.completed = true;
            step.date = this.order.updated_at_fr || ""; 
          } else {
            step.completed = false;
            step.date = "";
          }
        });
      }
      
    }


