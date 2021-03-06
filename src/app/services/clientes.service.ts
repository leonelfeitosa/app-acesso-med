import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private clientesUrl = 'clientes';

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

  public cadastrarCliente(cliente: Cliente): Observable<any> {
    return this.http.post<any>(this.clientesUrl, cliente, this.getToken());
  }

  public getClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.clientesUrl, this.getToken());
  }

  public getCliente(id: string): Observable<any> {
    return this.http.get(`${this.clientesUrl}/${id}`, this.getToken());
  }
}
