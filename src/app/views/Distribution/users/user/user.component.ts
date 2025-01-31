import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/services/User.service';
import { UtilisService } from 'src/app/shared/services/Utilis.service';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  dataset:any=[]

  constructor(
    public utilisService: UtilisService,
    private userService : UserService
  ){}

  ngOnInit(): void {
    this.getProd({size:10,page:0})
  }

  getProd(obj:any){
    this.userService.getAll(obj).subscribe({
      next: (data) => {
        this.utilisService.response(data, (d:any) => {
          console.log('users',d)
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

}
