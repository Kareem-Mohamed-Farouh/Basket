import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenService } from '../../core/services/auth/authen.service';
import { Router, RouterLink } from '@angular/router';
import { NotyfService } from '../../core/services/notyfSer/notyf.service';


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

  userName : WritableSignal<string> = signal('');
  errMessage : WritableSignal<string> = signal('');




  loginForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{7,}$/)]),
  })


  submitLogin(){
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next : (res)=>{
      if (res.message==='success') {
         this.userName.set(res.user.name)
         this.notyfSer.success(`Welcome ${this.userName()}`)
         this.router.navigate(['/home']);
       }
          console.log(res)
        },

        error : (err) =>{
          console.log(err)
          this.notyfSer.error(err.error.message)
        }
      })
      
    }

  }

}
