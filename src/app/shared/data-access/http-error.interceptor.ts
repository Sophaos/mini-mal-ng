import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: error.statusText,
          detail: `${error.message} `,
        });

        console.error(error.message);
        throw error;
      })
    );
  }
}
