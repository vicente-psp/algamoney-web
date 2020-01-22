import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../error-handler.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public showMenu = false;

  constructor(
    private router: Router,
    public authService: AuthService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  public exibeMenu(): boolean {
    return this.router.url !== '/login' && this.router.url !== '/';
  }

  public logout(): void {
    this.authService.logout().subscribe(
      () => {
        setTimeout(() => this.router.navigateByUrl('/login'), 1000);
      },
      err => this.errorHandlerService.handleError(err)
    );
  }

}
