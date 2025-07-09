import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { error } from 'console';
import { catchError, throwError } from 'rxjs';

import { inject } from '@angular/core';
import { NotyfService } from '../../../core/services/notyfSer/notyf.service';

export const handlEerrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notyfService = inject(NotyfService);
  return next(req).pipe(
    catchError((err) => {
      if (
        err.error.message == 'You are not logged in. Please login to get access'
      ) {
        notyfService.warning(err.error.message);
      }
      return throwError(() => {
        return err;
      });
    })
  );
};
