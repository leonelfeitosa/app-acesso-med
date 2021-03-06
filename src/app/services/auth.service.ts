import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'auth/login';

  constructor(private http: HttpClient) { }
  private getToken() {
    const token =  localStorage.getItem('token');
    const headers = {
      'Token': token
    };
    const requestOptions = {
      headers: new HttpHeaders(headers)
    };
    return requestOptions;
  }

  public login(auth: any): Observable<any> {
    return this.http.post(this.authUrl, auth, {});
  }


  public isAuthenticated(): Observable<any> {
    return this.http.get('auth/get', this.getToken());
  }

}
