import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ErrorMessagesComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ErrorMessagesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class SharedModule { }
