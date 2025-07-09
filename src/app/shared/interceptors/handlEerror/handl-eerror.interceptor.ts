import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { error } from 'console';
import { catchError, throwError } from 'rxjs';

import { inject } from '@angular/core';
import { NotyfService } from '../../../core/services/notyfSer/notyf.service';

export const handlEerrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notyfService = inject(NotyfService);
  return next(req).pipe(
    catchError((err) => {
      return throwError(() => {
        return notyfService.warning(err.error.message);
      });
    })
  );
};
