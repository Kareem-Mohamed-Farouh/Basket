import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenService } from '../../core/services/auth/authen.service';
import { Router, RouterLink } from '@angular/router';
import { NotyfService } from '../../core/services/notyfSer/notyf.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
 private readonly authService=inject(AuthenService);
  private readonly router=inject(Router);
  private notyfSer = inject(NotyfService)

  // userName : WritableSignal<string> = signal('');
  // errMessage : WritableSignal<string> = signal('');

 loading:boolean=false;
 msgerror:string=""
 succes:string=""


  loginForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{7,}$/)]),
  })


//   submitFrom():void{
// if (this.loginForm.valid) {
//   this.loading=true;
//   this.authService.login(this.loginForm.value).subscribe({
//     next:(res)=>{
//       console.log(res)
//       if (res.message==='success') {
//         this.loading=false
//       setTimeout(()=>{
//         localStorage.setItem('userToken',res.token)
//         this.authService.saveUserData()
//         this.router.navigate(['/home']);
//       },500)
//         this.succes=res.message
//       }
//     },
//     error:(err:HttpErrorResponse)=>{
//     console.log(err)
//   this.msgerror= err.error.message;
//     this.loading=false
//     }
//   })
// }
    
// }

submitLogin() {
  if (this.loginForm.valid) {
    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === 'success') {
          this.loading = false;
          localStorage.setItem('userToken', res.token);
          this.authService.saveUserData();
          this.notyfSer.success(`Welcome ${res.user?.name || ''}`);
          this.router.navigate(['/home']);
        } else {
          this.notyfSer.error('Login failed!');
          this.loading = false;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.msgerror = err.error.message;
        this.notyfSer.error(this.msgerror);
        this.loading = false;
      }
    });
  }
}


    
  }




