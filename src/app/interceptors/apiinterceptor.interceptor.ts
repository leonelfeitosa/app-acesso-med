import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


export class APIInterceptor implements HttpInterceptor {
    private apiUrlTest = 'http://localhost:3000';
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.startsWith('https://')) {
            const apiReq = req.clone({ url: `${this.apiUrlTest}/${req.url}` });
            return next.handle(apiReq);
        } else {
            return next.handle(req);
        }
    }
}
