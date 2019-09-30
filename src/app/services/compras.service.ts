import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private comprasUrl = 'compras';

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

  public cadastrarCompra(compra: object): Observable<object> {
    return this.http.post<object>(this.comprasUrl, compra, this.getToken());
  }
}
