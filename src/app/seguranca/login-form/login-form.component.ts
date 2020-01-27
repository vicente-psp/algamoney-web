import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { AuthService } from '../auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public loading = false;

  constructor(
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private toastyService: ToastyService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Login');
  }

  public login(usuario: string, senha: string): void {
    this.loading = true;
    this.authService.login(usuario, senha).subscribe(
      () => {
        this.toastyService.success('Usuário logado!');
        this.router.navigateByUrl('/lancamentos');
        this.authService.loginEventEmitter.next(true);
      },
      err => {
        this.loading = false;
        this.errorHandlerService.handleError(err);
      }
    );
  }

}
