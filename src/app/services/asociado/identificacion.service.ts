import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentificacionService {
  private url = 'identificacion';

  constructor(private apiService: ApiService) { }

  getIdetificaionesFull(): Observable<any>
  {
    return this.apiService.get(this.url);
  }
}
