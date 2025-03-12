import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { PaiementService } from 'src/app/shared/services/Paiement.service';
import { RetraitsService } from 'src/app/shared/services/Reraits.service';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone: true,
  imports:[CommonModule ,ReactiveFormsModule,
    FormsModule, ]
})
export class PaymentComponent {

  dataset:any=[]
  ladata:any
  itemClicked: any;
  itemForm!: FormGroup;
  loading:boolean = false;

   constructor(
      public utilisService: UtilisService,
      private retraitsService : RetraitsService,
      private router: Router,
      private fb: FormBuilder,
    ){}

    ngOnInit(): void {
      this.getProd({size:10,page:0})
      this.buildForm();
    }

    // openModal(item: any) {
    //   this.itemClicked = item;
    // }

    changeData(obj:any){
      this.ladata=obj
    }

    buildForm() {
      
      this.itemForm = this.fb.group({
        reference:[ '' ,[Validators.required]],
        id:'',
        montant:this.ladata?.montant
      })
    }


    getProd(obj:any){
      this.retraitsService.getAll(obj).subscribe({
        next: (data) => {
          this.utilisService.response(data, (d:any) => {
            console.log('demandes de retrait',d)
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


    handleOk(){
      this.loading=true
      let res = this.itemForm.value;
      delete res.montant
      res.id = this.ladata.id
    
      this.validation(res)
    }

    fermer(){
          const myModalEl = document.getElementById('infoModal');
          if (myModalEl) {
            const modalInstance = Modal.getInstance(myModalEl);
            modalInstance?.hide();
            }
      }

    validation(annonce: any){
      console.log(annonce)
     
        this.retraitsService.valider(annonce).subscribe({
          next: (data) => {
            this.utilisService.response(data, (d: any) => {
              this.loading=false
              this.fermer()
             Swal.fire({
                               position: 'center',
                               icon: 'success',
                               title: 'La demande de retrait a bien été validée',
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
  
  

}
