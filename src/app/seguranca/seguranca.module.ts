import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    ReactiveFormsModule,
    SharedModule,

    SegurancaRoutingModule,

    InputTextModule,
    ButtonModule,
  ]
})
export class SegurancaModule { }
