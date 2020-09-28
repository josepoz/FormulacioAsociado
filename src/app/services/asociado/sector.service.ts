import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  private url = 'sector';

  constructor(private apiService: ApiService) { }

  getSectorFull(): Observable<any>
  {
    const r = `${this.url}2`;
    return this.apiService.get(r);
  }
}
