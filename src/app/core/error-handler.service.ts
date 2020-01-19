import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { NotAuthenticatedError } from './../seguranca/money-http-interceptor';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private toastyService: ToastyService,
    private router: Router
  ) { }

  public handleError(errorResponse: any): void {
    let msg: string;
    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof NotAuthenticatedError) {
      msg = 'Sua sessão expirou!';
      this.router.navigateByUrl('/login');
    } else {
      if (errorResponse instanceof Response && errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar esta ação.';
        console.error('Ocorreu um erro', errorResponse);
      } else {
        if (errorResponse.status === 403) {
          msg = 'Você não tem permissão para executar esta ação!';
        } else {
          if (!this.isNullOrUndefined(errorResponse.error)
             && !this.isNullOrUndefined(errorResponse.error[0]) &&
            !this.isNullOrUndefined(errorResponse.error[0].userMessage)) {
             msg = errorResponse.error[0].userMessage;
             if (!this.isNullOrUndefined(errorResponse.error[0].developerMessage)) {
               console.error('Ocorreu um erro', errorResponse.error);
             }
          } else {
            msg = 'Erro ao processar serviço remoto. Tente novamente.';
            console.error('Ocorreu um erro', errorResponse);
          }
        }
      }
    }
    this.toastyService.error(msg);
  }

  private isNullOrUndefined(obj: any): boolean {
    return obj === null || obj === undefined;
  }

}
