import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { AuthService } from '../auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private toastyService: ToastyService,
    private router: Router
  ) { }

  public login(usuario: string, senha: string): void {
    this.authService.login(usuario, senha).subscribe(
      () => {
        this.toastyService.success('Usuário logado!');
        this.router.navigateByUrl('/lancamentos');
      },
      err => {
        this.errorHandlerService.handleError(err);
      }
    );
  }

}
