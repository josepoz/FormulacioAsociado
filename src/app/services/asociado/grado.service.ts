import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradoService {
  private url = 'grado';

  constructor(private apiService: ApiService) { }

  getGrados(): Observable<any>
  {
    return this.apiService.get(this.url);
  }

  getGradosFull(): Observable<any>
  {
    const r = `${this.url}2`;
    return this.apiService.get(r);
  }

  addGrado(grado): Observable<any>
  {
    return this.apiService.post(this.url, grado);
  }

  showGrado(id): Observable<any>
  {
    let r = `${this.url}/${id}`;
    return this.apiService.get(r);
  }

  updateGrado(grado): Observable<any>
  {
    return this.apiService.put(this.url, grado);
  }

  deleteGrado(id): Observable<any>
  {
    return this.apiService.delete(this.url, id);
  }
}
