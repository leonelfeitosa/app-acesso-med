import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:3000/auth/login'

  constructor(private http:HttpClient) { }

  public login(auth: any): Observable<any> {
    return this.http.post(this.authUrl, auth, {});
  }
}