import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  logged_user: any;

  constructor(private router: Router, private api: ApiService) { }

  setUserInfo(response) {
    if (response) {
      this.logged_user = response.usuario;
      localStorage.setItem('user_session', JSON.stringify({
        'username': this.logged_user.usuario,
        'nombre': this.logged_user.nombre,
        'email': this.logged_user.email,
        'id': this.logged_user.id
      }));
    }
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem('user_session'));
  }

  login(datosUsuario): Observable<any> {
    const url = 'auth/login';
    const params = {
      email: datosUsuario.email,
      password: datosUsuario.password
    }
    console.log(datosUsuario);
    return this.api.post(url, params);
  };

  logOut(userID): Observable<any> {
    let url = `usuarios/${userID}/sesiones`;
    return this.api.delete(url, userID);
  }
}
