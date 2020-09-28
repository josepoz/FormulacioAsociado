import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(
        private router: Router,
        private loginService: LoginService
    ) { }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        // Capturar next params
        let nextParam: string = '';
        let partNextParam: Array<any> = next['_urlSegment'].segments;
        partNextParam.forEach(val => {
            nextParam = nextParam + val.path + '/'
        })
        nextParam = nextParam.substring(0, nextParam.length - 1)

        // Comprobar si no existe información de algún usuario autenticado retornar falso
        if (!this.loginService.getUserInfo()) {
            this.router.navigate(['/login'], { queryParams: { next: nextParam } });
            return false;
        }

        return true;
    }
}
