import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
  private  url = 'municipio';

  constructor(private router: Router, private apiService: ApiService) { }

  getMunicipios(departamento_id): Observable<any>
  {
    const u = `departamento/${departamento_id}/${this.url}`;
    return this.apiService.get(u);
  }

  getMunicipiosFull(departamento_id): Observable<any>
  {
    const u = `departamento/${departamento_id}/${this.url}2`;
    return this.apiService.get(u);
  }

  addMunicipio(municipio): Observable<any>
  {
    return this.apiService.post(this.url, municipio);
  }

  showMunicipio(id): Observable<any>
  {
    const u = `${this.url}/${id}`;
    return this.apiService.get(u);
  }

  updateMunicipio(municipio): Observable<any>
  {
    return this.apiService.put(this.url, municipio);
  }

  deleteMunicipio(id): Observable<any>
  {
    return this.apiService.delete(this.url, id);
  }
}
