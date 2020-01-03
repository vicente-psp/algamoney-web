import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { PessoasService } from '../pessoas.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Pessoa } from '../../core/models/pessoa.model';


@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  public pessoa: Pessoa = new Pessoa();

  constructor(
    private pessoasService: PessoasService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  public salvar(form: FormControl): void {
    this.pessoa.ativo = true;
    this.pessoasService.salvar(this.pessoa).subscribe(
      () => {
        this.toastyService.success('Pessoa salva com sucesso!');
        form.reset(new Pessoa());
        this.pessoa = new Pessoa();
      },
      err => this.errorHandlerService.handleError(err)
    );
  }

}
