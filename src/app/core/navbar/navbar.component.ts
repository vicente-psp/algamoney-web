import { ErrorHandlerService } from './../error-handler.service';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  public exibeMenu(): boolean {
    return this.router.url !== '/login';
  }

  public logout(): void {
    this.authService.logout().subscribe(
      () => {
        this.router.navigateByUrl('/login');
      },
      err => this.errorHandlerService.handleError(err)
    );
  }

}
