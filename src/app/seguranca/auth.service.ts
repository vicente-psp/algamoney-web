import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_ENDPOINT_OAUTH_TOKEN: string;
  private API_ENDPOINT_TOKENS: string;
  public jwtPayload: any;

  constructor(
    private httpClient: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {
    this.API_ENDPOINT_OAUTH_TOKEN = `${environment.API_ENDPOINT}/oauth/token`;
    this.API_ENDPOINT_TOKENS = `${environment.API_ENDPOINT}/tokens`;
    this.carregarToken();
  }

  public login(usuario: string, senha: string): Observable<any> | any {
    const headers = new HttpHeaders()
        .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
        .append('Content-Type', 'application/x-www-form-urlencoded');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.httpClient.post(this.API_ENDPOINT_OAUTH_TOKEN, body,
      {headers, withCredentials: true})
      .pipe(
        tap((response: any) => this.armazenarToken(response.access_token)),
        catchError(err => {
            const responseError = err.error;
            if (err.status === 400) {
              if (responseError.error === 'invalid_grant') {
                return throwError('Usuário ou senha inválida');
              }
            }
            return throwError(err);
          }
        )
      );
  }

  public getRefreshToken(): any {
    const headers = new HttpHeaders()
        .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
        .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';

    return this.httpClient.post(this.API_ENDPOINT_OAUTH_TOKEN, body,
      {headers, withCredentials: true})
      .pipe(
       tap((response: any) => this.armazenarToken(response.access_token)),
       catchError(() => {
           return of(null);
         }
       )
    );
  }

  public logout() {
    return this.httpClient.delete(`${this.API_ENDPOINT_TOKENS}/revoke`, { withCredentials: true })
      .pipe(tap(() => this.removerAccessToken()));
  }

  private armazenarToken(token: string): void {
    this.jwtPayload = this.jwtHelperService.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private removerAccessToken(): void {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  private carregarToken(): void {
    const token = localStorage.getItem('token');

    if (!this.isNullOrUndefined(token)) {
      this.jwtPayload = this.jwtHelperService.decodeToken(token);
    }
  }

  public isNullOrUndefined(obj: any): boolean {
    return obj === null || obj === undefined;
  }

  public isAccessTokenInvalido(): boolean {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelperService.isTokenExpired(token);
  }

  public temPermissao(permissao: string): boolean {
    return !this.isNullOrUndefined(this.jwtPayload) && this.jwtPayload.authorities.includes(permissao);
  }

  public temQualquerPermissao(roles: string[]): boolean {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

}
