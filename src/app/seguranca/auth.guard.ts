import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isAccessTokenInvalido()) {
        return this.authService.getRefreshToken().subscribe(
          () => {
            if (this.authService.isAccessTokenInvalido()) {
              this.router.navigateByUrl('/login');
              return false;
            } else if (!next.data.roles || !this.authService.temQualquerPermissao(next.data.roles)) {
              this.router.navigateByUrl('/nao-autorizado');
              return false;
            }
            this.router.navigateByUrl(state.url);
            return true;
          }
        );
      } else if (!next.data.roles || !this.authService.temQualquerPermissao(next.data.roles)) {
        this.router.navigateByUrl('/nao-autorizado');
        return false;
      }
      return true;
  }

}
