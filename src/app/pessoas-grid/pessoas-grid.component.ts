import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  @Input() pessoas = [];


  public getAtivoStr(ativo: boolean): string {
    return ativo ? 'Ativo' : 'Inativo';
  }

}
