import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CondicionmService {
  private url = 'condicion';

  constructor(private apiService: ApiService) { }

  getCondicionesFull(): Observable<any>
  {
    return this.apiService.get(this.url);
  }
}
