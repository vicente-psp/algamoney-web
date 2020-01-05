import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-messages',
  template: `
    <div *ngIf="isErrorRequired()" class="ui-messages ui-messages-error">
      <p>
        {{ getTextErrorRequired() }}
      </p>
    </div>
    <div *ngIf="isErrorMinlenght()" class="ui-messages ui-messages-error">
      <p>
        {{ getTextErrorMinlenght() }}
      </p>
    </div>
    <div *ngIf="isErrorEmail()" class="ui-messages ui-messages-error">
      <p>
        {{ getTextErrorEmail() }}
      </p>
    </div>
  `,
  styles: [`
    .ui-messages-error {
      margin-top: 3px;
      margin-bottom: 0px;
      padding-top: 5px;
      padding-bottom: 5px;
    }
    p {
      margin-top: 0;
      margin-bottom: 0;
      width: 100%;
    }
  `]
})
export class ErrorMessagesComponent {

  @Input() control: FormControl;
  @Input() label: string;

  @Input() isGenderFemale = true;

  @Input() errorRequired = true;
  @Input() errorRequiredText = '';

  @Input() errorMinlenght = true;
  @Input() errorMinlenghtText = '';

  @Input() errorEmail = false;
  @Input() errorEmailText = '';


  public isErrorRequired(): boolean {
    return this.errorRequired && this.control.hasError('required') && this.control.touched;
  }

  public getTextErrorRequired(): string {
    if (this.errorRequiredText !== '') {
      return this.errorRequiredText;
    }
    const msgErrorRequired = 'Informe ' + (this.isGenderFemale === true ? 'a' : 'o');
    return msgErrorRequired + ' ' + this.label.toLowerCase();
  }

  public isErrorMinlenght(): boolean {
    return this.errorMinlenght && this.control.hasError('minlength') && this.control.dirty && this.control.touched;
  }

  public getTextErrorMinlenght(): string {
    if (this.errorMinlenghtText !== '') {
      return this.errorMinlenghtText;
    }
    const minlength = this.toNumberRequiredMinlength(this.control.errors.minlength);
    return `${this.label} deve conter mínimo de ${minlength} caracteres`;
  }

  public isErrorEmail(): boolean {
    return this.errorEmail && this.control.hasError('email') && this.control.dirty && this.control.touched;
  }

  public getTextErrorEmail(): string {
    if (this.errorEmailText !== '') {
      return this.errorEmailText;
    }
    return `${this.label} inválido`;
  }

  private toNumberRequiredMinlength(minlength: any): number | null {
    if (this.isNullOrUndefined(minlength.requiredLength)) {
      return null;
    }
    return Number.parseInt(minlength.requiredLength, 10);
  }

  private isNullOrUndefined(obj: any): boolean {
    return obj === null || obj === undefined;
  }

}
