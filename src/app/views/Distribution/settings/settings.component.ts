import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { Subscription } from 'rxjs';
import { SlidesService } from 'src/app/shared/services/Slides.service';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  imports:[CommonModule ,ReactiveFormsModule,
        FormsModule, ]
})
export class SettingsComponent {
  dataset:any=[]
  itemForm!: FormGroup;
  loading:boolean = false;
  file: any;
  fileSrc: string="";
  ifPhoto:any
  list_subsc: Subscription = new Subscription();

  constructor(
      public utilisService: UtilisService,
      private slideService :SlidesService,
      private router: Router,
      private fb: FormBuilder,
    ){}

    ngOnInit(): void {
      this.getProd()
      this.buildForm();
    }
    
    fermer(){
      const myModalEl = document.getElementById('infoModal');
      if (myModalEl) {
        const modalInstance = Modal.getInstance(myModalEl);
        modalInstance?.hide();
        }
  }

    loadFile(event:any) {
      console.log("==photo==")
      let reader = new FileReader();
     
        this.file = event.target.files[0];
        
        reader.onload = (e) => {
        this.fileSrc = reader.result as string;
        //  this.background = "bg-[url('"+this.fileSrc+"')]"
        // this.background = true;
        };
        reader.readAsDataURL(this.file);
       
        // console.log(this.file.name)
        // this.giveFile(this.file)
  
    }

    buildForm() {
          
          this.itemForm = this.fb.group({
            link:[ null ,[Validators.required]],
            id:null,
            product_id:[ null ,[Validators.required]]
          })
        }

        handleOk() {
          this.loading=true
          let res = this.itemForm.value;
         
          console.log('envoie',res)
          if(!res.id){
            delete res.id
            this.add(res,this.file)
          }
          // else{this.update(res,this.file)}
        
          
         
        }

    
  getProd(obj?:any){
    // obj.date_debut = this.formattedDate(this.dateDebut)
    // obj.date_fin = this.formattedDate(this.dateFin) 
    this.slideService.getAll(obj).subscribe({
      next: (data) => {
        this.utilisService.response(data, (d:any) => {
          console.log('images',d)
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

    add(produit: any, obj?: any){
      console.log(produit)
      this.list_subsc.add(
        this.slideService.create(produit,obj).subscribe({
          next: (data) => {
            this.utilisService.response(data, (d: any) => {
              // this.fermer()
              this.loading=false
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'La couverture a bien été enregistrée',
                  showConfirmButton: false,
                  timer: 1500,
                });
                setTimeout(() => {
                  window.location.reload();
                }, 2000); // 2000 ms = 2 secondes
                
            });
          },
          error: (error) => {
        this.utilisService.response(error,(d:any)=>{
          // this.fermer()
          this.loading=false
          Swal.fire({
          position: 'center',
          icon: 'warning',
          title:  d?.error?.message,
          showConfirmButton: false,
          // timer: 1500,
        });
        })
      },
        })
      );
    }

    handleDelete(imaj : any){
       Swal.fire({
            title: "Êtes-vous sûr(e) ?",
            text: "Supprimer cette image",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui",
            cancelButtonText: "Annuler",
          }).then((result) => {
            if (result.isConfirmed) {
              this.removeImg(imaj)
            }
          });
    }

    removeImg(data:any){
      this.slideService.delete(data).subscribe({
        next: (data) => {
          this.utilisService.response(data, (d: any) => {
            // this.fermer()
            this.loading=false
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'La couverture a bien été supprimée',
                showConfirmButton: false,
                timer: 1500,
              });
              setTimeout(() => {
                window.location.reload();
              }, 2000); // 2000 ms = 2 secondes
              
          });
        },
        error: (error) => {
          this.utilisService.response(error,(d:any)=>{
            // this.fermer()
            this.loading=false
            Swal.fire({
            position: 'center',
            icon: 'warning',
            title:  d?.error?.message,
            showConfirmButton: false,
            // timer: 1500,
          });
          })
      
        }

      })
    }

       
}
