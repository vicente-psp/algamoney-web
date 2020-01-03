import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { CategoriasService } from '../../categorias/categorias.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Lancamento } from '../../core/models/lancamento.model';
import { LancamentosService } from './../lancamentos.service';
import { PessoasService } from './../../pessoas/pessoas.service';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  public lancamento = new Lancamento();
  public categorias = [];
  public pessoas = [];
  public tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  constructor(
    private lancamentosService: LancamentosService,
    private errorHandlerService: ErrorHandlerService,
    private categoriasService: CategoriasService,
    private pessoasService: PessoasService,
    private toastyService: ToastyService
    ) { }

  ngOnInit() {
    this.listAllCategorias();
    this.listAllPessoas();
  }

  private listAllCategorias(): void {
    this.categoriasService.listAll().subscribe(
      data => {
        this.categorias = data.map(categoria => ({ value: categoria.id, label: categoria.nome }));
      },
      err => this.errorHandlerService.handleError(err)
    );
  }

  private listAllPessoas(): void {
    this.pessoasService.listAll().subscribe(
      data => {
        this.pessoas = data.map(pessoa => ({ value: pessoa.id, label: pessoa.nome }));
      },
      err => this.errorHandlerService.handleError(err)
    );
  }

  public salvar(form: FormControl): void {
    this.lancamentosService.salvar(this.lancamento).subscribe(
      () => {
        this.toastyService.success('Lançamento cadastrado com sucesso');
        form.reset(new Lancamento());
        this.lancamento = new Lancamento();
      },
      err => this.errorHandlerService.handleError(err)
    );
  }

}
