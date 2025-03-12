import { CommonModule } from '@angular/common';
import { Component , inject } from '@angular/core';
import { UserService } from 'src/app/shared/services/User.service';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DetailUserComponent } from '../detail-user/detail-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports:[CommonModule ]
})
export class UserComponent {

  dataset:any=[]
  dialog = inject(MatDialog);
  dateDebut:any
  dateFin:any
  totalStandard:any
  totalRecrutes:any
  totalStandardByDate:any
  totalRecrutesByDate:any

  constructor(
    public utilisService: UtilisService,
    private userService : UserService,
    private router: Router,
  ){}

  ngOnInit(): void {
    const now = new Date();

    // Début de la journée (00:00:00)
    this.dateDebut = new Date(now.setHours(0, 0, 0, 0));

    // Fin de la journée (23:59:59)
    this.dateFin = new Date(now.setHours(23, 59, 59, 999));
    this.getProd({size:10,page:0,roles_as:'seller'})
  }

  formattedDate(ladate:Date){
    return ladate.toISOString().split('T')[0];
  }

  openDialog(userId?:any) {
    this.router.navigate(['/users/detail'] , { queryParams: { id: userId } })
    // this.dialog.open(DetailUserComponent, {
    //   data: {
    //     animal: 'panda',
    //   },
    // });
  }

  fullStars(cpt:any): any[] {
    return Array(cpt);
  }

  emptyStars(cpt:any): any[] {
    return Array(5 - cpt);
  }

  getProd(obj:any){
    obj.date_debut = this.formattedDate(this.dateDebut)
    obj.date_fin = this.formattedDate(this.dateFin) 
    this.userService.getAll(obj).subscribe({
      next: (data) => {
        this.utilisService.response(data, (d:any) => {
          console.log('users',d)
          // this.loading = false
          this.dataset=d.data;
          this.totalStandard = d.total_without_recruiter
          this.totalRecrutes = d.total_with_recruiter
          this.totalStandardByDate = d.total_without_recruiter_by_date
          this.totalRecrutesByDate = d.total_with_recruiter_by_date
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
