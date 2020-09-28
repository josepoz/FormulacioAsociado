import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesionService {
  private url = 'profesion';

  constructor(private apiService: ApiService) { }

  getProfesiones(): Observable<any>
  {
    return this.apiService.get(this.url);
  }

  getProfesionesFull(): Observable<any>
  {
    const r = `${this.url}2`;
    return this.apiService.get(r);
  }

  addProfesion(profesion): Observable<any>
  {
    return this.apiService.post(this.url, profesion);
  }

  showProfesion(id): Observable<any>
  {
    let r = `${this.url}/${id}`;
    return this.apiService.get(r);
  } 

  updateprofesion(profesion): Observable<any>
  {
    return this.apiService.put(this.url, profesion);
  }

  deleteProfesion(id): Observable<any>
  {
    return this.apiService.delete(this.url, id);
  }
}
