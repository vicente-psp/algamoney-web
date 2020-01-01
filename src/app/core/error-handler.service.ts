import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private toastyService: ToastyService
  ) { }

  public handleError(errorResponse: any): void {
    let msg: string;
    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else {
      if (!this.isNullOrUndefined(errorResponse.error[0]) &&
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
    this.toastyService.error(msg);
  }

  private isNullOrUndefined(obj: any): boolean {
    return obj === null || obj === undefined;
  }

}
