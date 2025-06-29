import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators}from "@angular/forms"
import { AuthenService } from '../../core/services/auth/authen.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

   private readonly authService=inject(AuthenService);
 private readonly Router=inject(Router);
 loading:boolean=false;
 msgerror:string=""
 succes:string=""



register:FormGroup=new FormGroup({
  name:new FormControl(null,[Validators.required , Validators.minLength(3),Validators.maxLength(20)]),
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{7,}$/)]),
  rePassword:new FormControl(null,Validators.required),
  phone:new FormControl(null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
});
// {updateOn:'submit'}
// , {validators:this.confirmPassword}

submitFrom():void{
if (this.register.valid) {
  this.loading=true;
  this.authService.signUp(this.register.value).subscribe({
    next:(res)=>{
      console.log(res)
      if (res.message==='success') {
        this.loading=false
      setTimeout(()=>{
        this.Router.navigate(['/login']);
      },500)
        this.succes=res.message
      }
    },
    error:(err:HttpErrorResponse)=>{
    console.log(err)
  this.msgerror= err.error.message;
    this.loading=false
    }
  })
}
else{
  this.register?.setErrors({mismatch:true})
  this.register.markAllAsTouched()
}
    
}

}
