import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private router: Router, private apiService: ApiService) { }

  getDepartamentos(pais_id): Observable<any>
  {
    const url = `pais/${pais_id}/departamento`;
    return this.apiService.get(url);
  }

  getDepartamentosFull(pais_id): Observable<any>
  {
    const url = `pais/${pais_id}/departamento2`;
    return this.apiService.get(url);
  }


  addDepartamento(departamento): Observable<any>
  {
    const url = `departamento`;
    return this.apiService.post(url, departamento);
  }

  showDepartamento(departamento_id): Observable<any>
  {
    const url = `departamento/${departamento_id}`;
    return this.apiService.get(url);
  }

  updateDepartamento(departamento): Observable<any>
  {
    const url = `departamento`;
    return this.apiService.put(url, departamento);
  }

  deleteDepartamento(id): Observable<any>
  {
    const url = 'departamento';
    return this.apiService.delete(url, id);
  }
}
