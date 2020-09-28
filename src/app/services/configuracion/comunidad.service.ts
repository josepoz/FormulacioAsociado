import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {
  private url = 'comunidad';

  constructor(private apiService: ApiService) { }

  getComunidades(municipio_id): Observable<any>
  {
    const u = `municipio/${municipio_id}/${this.url}`;
    return this.apiService.get(u);
  }

  getComunidadesFull(municipio_id): Observable<any>
  {
    const u = `municipio/${municipio_id}/${this.url}2`;
    return this.apiService.get(u);
  }

  addComunidad(comunidad): Observable<any>
  {
    return this.apiService.post(this.url, comunidad);
  }

  showComunidad(id): Observable<any>
  {
    const u = `${this.url}/${id}`;
    return this.apiService.get(u);
  }

  updateComunidad(comunidad): Observable<any>
  {
    return this.apiService.put(this.url, comunidad);
  }

  deleteComunidad(id)
  {
    return this.apiService.delete(this.url, id);
  }
}
