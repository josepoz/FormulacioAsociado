import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgenciaService {
  private url = 'institucion'
  constructor(private apiService: ApiService) { }

  getAgencia(): Observable<any>
  {
    return this.apiService.get(this.url);
  }
  
  addAgencia(agencia): Observable<any>
  {
    return this.apiService.post(this.url, agencia);
  }

  showAgencia(id): Observable<any>
  {
    const r = `${this.url}/${id}`
    return this.apiService.get(r);
  }

  updateAgencia(agencia): Observable<any>
  {
    return this.apiService.put(this.url, agencia);
  }

  deleteAgencia(id): Observable<any>
  {
    return this.apiService.delete(this.url, id);
  }
}
