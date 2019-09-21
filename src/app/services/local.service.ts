import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado';
import { Cidade } from '../models/cidade';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private estadosUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  constructor(private http: HttpClient) { }

  public getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.estadosUrl);
  }

  public getCidades(estadoId: number): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`${this.estadosUrl}/${estadoId}/municipios`);
  }
}
