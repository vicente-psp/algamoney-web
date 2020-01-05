import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';


@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent
  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule,
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
    {
      provide: LOCALE_ID, useValue: 'pt-BR'
    }
  ]
})
export class CoreModule { }
