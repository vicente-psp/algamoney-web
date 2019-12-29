import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// imports primeng
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';

import { LancamentosModule } from './lancamentos/lancamentos.module';

@NgModule({
  declarations: [
    AppComponent,

    NavbarComponent,
    PessoasPesquisaComponent,
    PessoaCadastroComponent,
    ErrorMessagesComponent,
    PessoasGridComponent
  ],
  exports: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    // imports primeng
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule,

    CurrencyMaskModule,

    LancamentosModule,

    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
