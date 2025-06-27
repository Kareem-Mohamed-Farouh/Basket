import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
 

 
if (isPlatformBrowser(PLATFORM_ID)) {
  if (localStorage.getItem('token')) {
   let userHeader:any = {token:localStorage.getItem('token')}

 
 req = req.clone({
  setHeaders :userHeader
})
  }
}

  return next(req);
};
