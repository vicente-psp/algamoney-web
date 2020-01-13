import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { ErrorHandlerService } from './error-handler.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';


@NgModule({
  declarations: [
    NaoAutorizadoComponent,
    NavbarComponent,
    PaginaNaoEncontradaComponent,
  ],
  exports: [
    ConfirmDialogModule,
    NavbarComponent,
    ToastyModule,
  ],
  imports: [
    CommonModule,
    RouterModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule,
  ],
  providers: [
    ErrorHandlerService,

    ConfirmationService,
    JwtHelperService,
    {
      provide: LOCALE_ID, useValue: 'pt-BR'
    }
  ]
})
export class CoreModule { }
