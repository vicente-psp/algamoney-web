import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule,
  ],
  imports: [
    CommonModule,

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
