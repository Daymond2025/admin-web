import { Component } from '@angular/core';
import { BackButtonComponent } from 'src/app/back-button/back-button.component';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css'],
  standalone:true,
  imports:[BackButtonComponent]
})
export class AddAdminComponent {

}
