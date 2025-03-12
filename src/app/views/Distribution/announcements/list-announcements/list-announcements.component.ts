import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdsService } from 'src/app/shared/services/Ads.service';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-announcements',
  standalone: true, // Important
  templateUrl: './list-announcements.component.html',
  styleUrls: ['./list-announcements.component.css'],
  imports:[CommonModule ,ReactiveFormsModule,
          FormsModule, ]
})
export class ListAnnouncementsComponent {
  activeTab: string = 'premier-tab'; // Onglet actif par défaut
  dataset:any=[]
  itemForm!: FormGroup;
  loading:boolean = false;
  file: any;
  fileSrc: string="";
  ifPhoto:any
  list_subsc: Subscription = new Subscription();
  annonceD : any

  constructor(
        public utilisService: UtilisService,
        private adsService :AdsService,
        private router: Router,
        private fb: FormBuilder,
      ){}

      ngOnInit(): void {
        this.getProd()
        this.buildForm();
      }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  handleOpenDialog(data?:any){
    console.log(data)
    this.annonceD = data
    // this.setActiveTab('premier-tab')
  }

  charger(){
    window.location.reload();
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
              title:[ null ,[Validators.required]],
              url:[ null ,[Validators.required]],
              nb_repeat:[ null ,[Validators.required]],
              product_id:[ null ,[Validators.required]]
            })
          }
  
          handleOk() {
            this.loading=true
            let res = this.itemForm.value;        
            console.log('envoie',res)          
            this.add(res,this.file)

          }
  
      
    getProd(obj?:any){
      // obj.date_debut = this.formattedDate(this.dateDebut)
      // obj.date_fin = this.formattedDate(this.dateFin) 
      this.adsService.getAll(obj).subscribe({
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
          this.adsService.create(produit,obj).subscribe({
            next: (data) => {
              this.utilisService.response(data, (d: any) => {
                // this.fermer()
                this.loading=false
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Annonce bien enregistrée',
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
                  text: "Supprimer cette annonce",
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

          handleActivation(imaj : any , move :any){
            Swal.fire({
                 title: "Êtes-vous sûr(e) ?",
                 text: move + " cette annonce",
                 icon: "warning",
                 showCancelButton: true,
                 confirmButtonColor: "#3085d6",
                 cancelButtonColor: "#d33",
                 confirmButtonText: "Oui",
                 cancelButtonText: "Annuler",
               }).then((result) => {
                 if (result.isConfirmed) {
                   this.activeImg(imaj,move)
                 }
               });
         }
      
          removeImg(data:any){
            this.adsService.delete(data).subscribe({
              next: (data) => {
                this.utilisService.response(data, (d: any) => {
                  // this.fermer()
                  this.loading=false
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Annonce bien supprimée',
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

          activeImg(data:any,move:any){
            this.adsService.changeStatus(data).subscribe({
              next: (data) => {
                this.utilisService.response(data, (d: any) => {
                  // this.fermer()
                  this.loading=false
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: move=='Désactiver' ? 'Annonce désactivée' :'Annonce activée',
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
