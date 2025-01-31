import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';

import { AdminService } from 'src/app/shared/services/Admin.service';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AdminService,
    private router: Router,
    private utilisService: UtilisService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log('form submitted', this.loginForm.value);
    console.log('form submitted', this.loginForm.errors);
  
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Veuillez renseigner tous les champs',
        showConfirmButton: false,
        timer: 1500,
      });
      this.loading = false;
    } else {
      this.loading = true;
      this.signinAdmin(this.loginForm.value)
      // this.authService
      //   .login(this.loginForm.value)
      //   .pipe(first())
      //   .subscribe(
      //     (data) => {
      //       // Vérification de la validité de la réponse
      //       if (!data.status) {
      //         Swal.fire({
      //           position: 'center',
      //           icon: 'warning',
      //           title: data.message,
      //           showConfirmButton: false,
      //           timer: 1500,
      //         });
      //       } else {
      //         this.router.navigate(['/dashboard']);
      //       }
      //       this.loading = false;
      //     },
      //     (error) => {
      //       this.loading = false;
      //       Swal.fire({
      //         position: 'center',
      //         icon: 'warning',
      //         title: 'Identifiants incorrects',
      //         showConfirmButton: false,
      //         timer: 1500,
      //       });
      //       this.loading = false;
      //     }
      //   );
    }
  }

  signinAdmin(obj:any){
    console.log('login admin',obj)
    this.authService.login(obj).subscribe({
      next: (data) => {
        console.log('=LA DATA=',data)
        this.utilisService.response(data, (d:any) => {
          // this.loading=false
            console.log(d)
            if(data.status==204){
              this.loading=false
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Identifiants incorrects',
                showConfirmButton: false,
                timer: 1500,
              });
            }
            else{
              localStorage.setItem('user_info',JSON.stringify(d.data))
              this.router.navigate(['/orders'])
            }
        });
      },
      error: (error) => {
        this.utilisService.response(error,(d:any)=>{
          this.loading=false
          // console.log('erreur',error)
          console.log('erreur',d?.error?.message)
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: d.error.message,
            showConfirmButton: false,
            timer: 1500,
          });
          
        })
      },
    });
  }

  
}
