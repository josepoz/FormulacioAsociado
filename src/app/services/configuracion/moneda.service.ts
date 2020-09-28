import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {
  private url = 'moneda';

  constructor(private apiService: ApiService) { }

  getMonedas(): Observable<any>
  {
    return this.apiService.get(this.url);
  }

  addMoneda(moneda): Observable<any>
  {
    return this.apiService.post(this.url, moneda);
  }

  showMoneda(id): Observable<any>
  {
    let r = `${this.url}/${id}`;
    return this.apiService.get(r);
  } 

  updateMoneda(moneda): Observable<any>
  {
    return this.apiService.put(this.url, moneda);
  }

  deleteMoneda(id): Observable<any>
  {
    return this.apiService.delete(this.url, id);
  }
}
