import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private url =  'pais';

  constructor(private router: Router, private apiService: ApiService) { }

  getPaises(): Observable<any>
  {
    return this.apiService.get(this.url); 
  }

  addPais(pais): Observable<any>
  {
    return this.apiService.post(this.url, pais);
  }

  showPais(id): Observable<any>
  {
    let r = `${this.url}/${id}`;
    return this.apiService.get(r);
  }

  updatePais(pais): Observable<any>
  {
    return this.apiService.put(this.url, pais);
  }

  deletePais(id): Observable<any>
  {
    return this.apiService.delete(this.url, id);
  }
}
