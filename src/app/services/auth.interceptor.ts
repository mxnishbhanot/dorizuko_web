import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const excludedUrls = ['/forgot-password'];

  // Check if the request URL matches any of the excluded URLs
  const isExcluded = excludedUrls.some((url) => request.url.includes(url));

  if (!isExcluded) {
    const authService = inject(AuthService);
    const token = authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }

  return next(request);
};
