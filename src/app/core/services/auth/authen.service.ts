import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../../shared/environments/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(private http:HttpClient) { }


  //  تسجيل مستخدم جديد
  signUp(signUpData: any):Observable<any> {
    return this.http.post(`${baseUrl}/api/v1/auth/signup`, signUpData);
  }

  // تسجيل الدخول
  login(signinData: any):Observable<any> {
    return this.http.post(`${baseUrl}/api/v1/auth/signin`, signinData);
  }

  //  نسيت كلمة المرور
  forgotPassword(email: string):Observable<any> {
    return this.http.post(`${baseUrl}/api/v1/auth/forgotPasswords`, { email });
  }


  //  التحقق من رمز إعادة تعيين كلمة المرور
  verifyResetCode(code: string):Observable<any> {
    return this.http.post(`${baseUrl}/api/v1/auth/verifyResetCode`, { code });
  }


  //  إعادة تعيين كلمة المرور
  resetPassword(resetData: any):Observable<any> {
    return this.http.post(`${baseUrl}/api/v1/auth/resetPassword`, resetData);
  }

  //  تغيير كلمة المرور للمستخدم الحالي
  changePassword(changeData: any):Observable<any> {
    return this.http.post(`${baseUrl}/api/v1/users/changeMyPassword`, changeData);
  }


}
