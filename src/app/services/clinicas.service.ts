import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clinica } from '../models/clinica';

@Injectable({
  providedIn: 'root'
})
export class ClinicasService {
  private clinicasUrl = 'clinicas';
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

  public getClinicas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.clinicasUrl}/?situacao=ativo`, this.getToken());
  }

  public getClinica(id: string): Observable<Clinica> {
    return this.http.get<Clinica>(`${this.clinicasUrl}/${id}`, this.getToken());
  }
}
