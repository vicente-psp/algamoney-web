import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,

    SegurancaRoutingModule,

    InputTextModule,
    ButtonModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
    })
  ],
  declarations: [
    LoginFormComponent
  ],
  providers: [
    JwtHelperService
  ]
})
export class SegurancaModule { }
