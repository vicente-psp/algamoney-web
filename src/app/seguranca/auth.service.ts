import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_ENDPOINT_TOKEN = 'http://localhost:8080/oauth/token';
  public jwtPayload: any;

  constructor(
    private httpClient: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {
    this.carregarToken();
  }

  public login(usuario: string, senha: string): Observable<any> | any {
    const headers = new HttpHeaders()
        .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
        .append('Content-Type', 'application/x-www-form-urlencoded');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.httpClient.post(this.API_ENDPOINT_TOKEN, body,
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

  public getRefreshToken() {
    const headers = new HttpHeaders()
        .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
        .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';

    return this.httpClient.post(this.API_ENDPOINT_TOKEN, body,
      {headers, withCredentials: true})
      .pipe(
       tap((response: any) => this.armazenarToken(response.access_token)),
       catchError(() => {
           return of(null);
         }
       )
    );
  }

  private armazenarToken(token: string): void {
    this.jwtPayload = this.jwtHelperService.decodeToken(token);
    localStorage.setItem('token', token);
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
