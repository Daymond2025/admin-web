import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { UrlConstant } from 'src/app/core/constants/url_constants';
// import { IComptable } from 'src/app/core/interfaces/data_response';
// import { ApiService } from 'src/app/core/services/api.service';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { DashboardService } from 'src/app/shared/services/Dashboard.service';
import { UtilisService } from 'src/app/shared/services/Utilis.service';

@Component({
  selector: 'app-notsolder',
  templateUrl: './notsolder.component.html',
  styleUrls: ['./notsolder.component.css'],
  standalone: true, // Standalone component
  imports:[CommonModule , TruncatePipe ]
})
export class NotsolderComponent implements OnInit {
  dataComptable:any;
  isLoading: boolean = false;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly router: Router,
    public utilisService: UtilisService,
  )
  {}

  ngOnInit(): void {
    this.loadDataComptable();
  }
  loadDataComptable(): void {
    this.isLoading = true;
    this.dashboardService.getAll({option:"accountant"}).subscribe(
    {  next :(data: any) => {
      this.utilisService.response(data, (d:any) => {
        if (d) {
          this.isLoading = false;
          console.log("Données du dashboard :", d);
          this.dataComptable = d;
        }
      })
        },
       error : (error) => {
          console.error(error);
          this.isLoading = false;
        }}
    );
  }
}
