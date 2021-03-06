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

  public cadastrarCompra(compra: object): Observable<any> {
    return this.http.post<any>(this.comprasUrl, compra, this.getToken());
  }

  public getHistorico(clienteId: object): Observable<object[]> {
    return this.http.get<object[]>(`${this.comprasUrl}/?cliente=${clienteId}`, this.getToken());
  }

  public getCompra(compraId: string): Observable<any> {
    return this.http.get<any>(`${this.comprasUrl}/${compraId}`, this.getToken());
  }

  public alterarCompra(idCompra: string, alteracao: object): Observable<object> {
    return this.http.put<object>(`${this.comprasUrl}/${idCompra}`, alteracao, this.getToken());
  }
}
