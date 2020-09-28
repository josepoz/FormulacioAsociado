import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private BASE_URL = 'https://secret-citadel-75373.herokuapp.com/api';

    constructor(private http: HttpClient) {}


    private armarUrl(url: string) {
        return `${this.BASE_URL}/${url}`;
    }

    get(url?: any, params?: any) {
        let _url: string = this.armarUrl(url);
        return this.http.get(_url, this.cabecera(params)).pipe(
            catchError(this.capturarErrores)
        )
    }

    post(url: string, data: any) {
        let _url = this.armarUrl(url);
        return this.http.post(_url, JSON.stringify(data),this.cabecera())
            .pipe(
                catchError(this.capturarErrores)
            );
    }

    put(url: string, data: any){
        let _url = this.armarUrl(url);
        return this.http.put(`${_url}/${data.id}`, JSON.stringify(data), this.cabecera())
            .pipe(
                catchError(this.capturarErrores)
            );
    }

    delete(url: string, id) {
        let _url = this.armarUrl(url);
        return this.http.delete(`${_url}/${id}`, this.cabecera())
            .pipe(
                catchError(this.capturarErrores)
            );
    }

    private cabecera(params?: any) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            })
        };

        // Verificamos si existe token a enviar
        const TOKEN_USER = localStorage.getItem('token');
        if(TOKEN_USER) {
            httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${TOKEN_USER}`);
        }

        if(params) {
            params = { params };
            httpOptions = {
                ...httpOptions,
                ...params
            };
        }
        return httpOptions;
    }
    private capturarErrores(error: any) {
        console.log(error)

        // return error.error;
        return throwError(
            // 'El servidor devolvio un error'
            error
        );
    }
}
