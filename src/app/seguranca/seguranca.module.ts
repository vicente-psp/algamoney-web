import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { AuthGuard } from './auth.guard';
import { MoneyHttpInterceptor } from './money-http-interceptor';
import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { SharedModule } from '../shared/shared.module';
import { environment } from './../../environments/environment';


export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,

    SegurancaRoutingModule,

    InputTextModule,
    ButtonModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.whitelistedDomains,
        blacklistedRoutes: environment.blacklistedRoutes
      }
    })
  ],
  declarations: [
    LoginFormComponent
  ],
  providers: [
    JwtHelperService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: MoneyHttpInterceptor,
        multi: true
    },
    AuthGuard
  ]
})
export class SegurancaModule { }
