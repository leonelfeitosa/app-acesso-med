import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


export class APIInterceptor implements HttpInterceptor {
    private apiUrlTest = 'http://192.168.1.218:3000';
    private apiUrlProd = 'http://162.243.161.30:3021';
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.startsWith('https://')) {
            const apiReq = req.clone({ url: `${this.apiUrlProd}/${req.url}` });
            return next.handle(apiReq);
        } else {
            return next.handle(req);
        }
    }
}
