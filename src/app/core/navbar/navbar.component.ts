import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { ToastyService } from 'ng2-toasty';

import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../error-handler.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public showMenu = false;
  public items: MenuItem[];

  private subscriptionLogin: Subscription;

  constructor(
    private router: Router,
    private toastyService: ToastyService,
    public authService: AuthService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
    if (this.existeJwtPayload()) {
      this.configurarItensSidebar();
    }
    this.subscriptionLogin = this.authService.getLoginEventEmitter().subscribe(
      (isLogin: boolean) => {
        if (isLogin) {
          this.configurarItensSidebar();
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionLogin.unsubscribe();
  }

  public exibeMenu(): boolean {
    return this.router.url !== '/login' && this.router.url !== '/';
  }

  private novoLancamento(): void {
    if (this.authService.temPermissao('ROLE_CADASTRAR_LANCAMENTO')) {
      this.router.navigateByUrl('/lancamentos/salvar');
    } else {
      this.toastyService.error('Você não tem permissão para cadastrar lançamentos!');
    }
    this.showMenu = false;
  }

  private listarLancamentos(): void {
    if (this.authService.temPermissao('ROLE_PESQUISAR_LANCAMENTO')) {
      this.router.navigateByUrl('/lancamentos');
    } else {
      this.toastyService.error('Você não tem permissão para listar lançamentos!');
    }
    this.showMenu = false;
  }

  private novaPessoa(): void {
    if (this.authService.temPermissao('ROLE_CADASTRAR_PESSOA')) {
      this.router.navigateByUrl('/pessoas/salvar');
    } else {
      this.toastyService.error('Você não tem permissão para cadastrar pessoas!');
    }
    this.showMenu = false;
  }

  private listarPessoas(): void {
    if (this.authService.temPermissao('ROLE_PESQUISAR_PESSOA')) {
      this.router.navigateByUrl('/pessoas');
    } else {
      this.toastyService.error('Você não tem permissão para listar pessoas!');
    }
    this.showMenu = false;
  }

  private novaCategoria(): void {
    this.toastyService.warning('Route not implemented, sorry!');
    return;
    if (this.authService.temPermissao('ROLE_CADASTRAR_CATEGORIA')) {
      this.router.navigateByUrl('/categorias/salvar');
    } else {
      this.toastyService.error('Você não tem permissão para listar categorias!');
    }
    this.showMenu = false;
  }

  private listarCategorias(): void {
    this.toastyService.warning('Route not implemented, sorry!');
    return;
    if (this.authService.temPermissao('ROLE_PESQUISAR_CATEGORIA')) {
      this.router.navigateByUrl('/categorias');
    } else {
      this.toastyService.error('Você não tem permissão para listar categorias!');
    }
    this.showMenu = false;
  }

  public logout(): void {
    this.router.navigateByUrl('/login');
    this.showMenu = false;
    this.authService.logout().subscribe(
      () => {
        this.toastyService.success('Logout efetuado com sucesso!');
      },
      err => this.errorHandlerService.handleError(err)
    );
  }

  private nomeUsuario(): string {
    if (!this.existeJwtPayload()) {
      return '';
    }
    return this.authService.jwtPayload.nome;
  }

  private existeJwtPayload(): boolean {
    return this.authService.jwtPayload !== undefined && this.authService.jwtPayload !== null;
  }

  private configurarItensSidebar(): void {
    this.items = [
      {
          label: this.nomeUsuario(), icon: 'pi pi-fw pi-user'
      },
      {separator: true},
      {
          label: 'Lançamentos',
          icon: 'pi pi-fw pi-dollar',
          items: [
            { label: 'Novo', icon: 'pi pi-fw pi-plus', command: () => this.novoLancamento() },
            { label: 'Listar', icon: 'pi pi-fw pi-bars', command: () => this.listarLancamentos() },
          ]
      },
      {
          label: 'Pessoas',
          icon: 'pi pi-fw pi-user',
          items: [
            { label: 'Nova', icon: 'pi pi-fw pi-user-plus', command: () => this.novaPessoa() },
            { label: 'Listar', icon: 'pi pi-fw pi-users', command: () => this.listarPessoas() },
          ]
      },
      {
          label: 'Categorias',
          icon: 'pi pi-fw pi-tags',
          items: [
            { label: 'Nova', icon: 'pi pi-fw pi-plus', command: () => this.listarCategorias() },
            { label: 'Listar', icon: 'pi pi-fw pi-bars', command: () => this.novaCategoria() },
          ]
      },
      {separator: true},
      {
          label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => this.logout()
      }
    ];
  }

}
