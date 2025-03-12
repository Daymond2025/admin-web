import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/User.service';
import { UtilisService } from 'src/app/shared/services/Utilis.service';

@Component({
  selector: 'app-detail-user',
  standalone: true,
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css'],
  imports:[CommonModule ]
})
export class DetailUserComponent {
  dataset:any
  idUser:any
    constructor(
      public utilisService: UtilisService,
      private userService : UserService,
      private router: Router,
      private route: ActivatedRoute
    ){}

    ngOnInit(): void {
      if(this.route.queryParams){
        this.route.queryParams.subscribe(params => {
          console.log('User ID:', params['id']);
          this.idUser=params["id"]
          this.getUser({id:this.idUser})
  
          
        });
      }
      
      
    }

    getUser(obj:any){
      this.userService.getUser(obj).subscribe({
        next: (data) => {
          this.utilisService.response(data, (d:any) => {
            console.log('le user',d)
            // this.loading = false
            this.dataset=d;
            // this.total = d.totalItems
          });
        },
        error: (error) => {
          this.utilisService.response(error,(d:any)=>{
      
          })
        },
      });
    }

}
