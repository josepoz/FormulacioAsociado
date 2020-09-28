import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocioService {
  private url = 'socio';

  constructor(private apiService: ApiService) { }

  getSocios(): Observable<any>
  {
    return this.apiService.get(this.url);
  }

  getSociosFiltro(filtro): Observable<any>
  {
    return this.apiService.get(this.url,filtro);
  }

  getTitular(socio_id): Observable<any>
  {
    return this.apiService.get(`${this.url}select?socio_id=${socio_id}`);
  }

  addSocio(socio): Observable<any>
  {
    return this.apiService.post(this.url, socio);
  }

  searchSocio(socio): Observable<any>
  {
    return this.apiService.post(`${this.url}search?per_page=4`, socio);
  }

  getTipoIngresos(){
    return this.apiService.get(`tipo_ingreso2`);
  }


  getTipoMonedas(){
    return this.apiService.get(`moneda2`);
  }

  createSocio(socio:any){
    return this.apiService.post(`${this.url}`,socio);
  }

  getSocio(socio_id){
    return this.apiService.get(`${this.url}/${socio_id}`);
  }

  updateSocio(socio)
  {
    return this.apiService.put(this.url, socio);
  }


  deleteSocio(socio_id){
    return this.apiService.delete(`${this.url}`,socio_id);
  }


}
