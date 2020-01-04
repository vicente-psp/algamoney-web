import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import { take } from 'rxjs/operators';

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
  public title = 'Novo Lançamento';

  constructor(
    private lancamentosService: LancamentosService,
    private errorHandlerService: ErrorHandlerService,
    private categoriasService: CategoriasService,
    private pessoasService: PessoasService,
    private toastyService: ToastyService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe(
      (params: ParamMap) => {
        if (!this.lancamentosService.isNullOrUndefined(params.get('id'))) {
          const id = Number.parseInt(params.get('id'), 10);
          if (id > 0) {
            this.getLancamento(id);
            this.title = 'Edição de Lançamento';
          }
        }
      }
    );

    this.listAllCategorias();
    this.listAllPessoas();
  }

  private getLancamento(id: number): void {
    this.lancamentosService.getDados(id).subscribe(
      (lancamento: Lancamento) => {
        this.lancamento = lancamento;
      },
      err => {
        this.errorHandlerService.handleError(err);
        setTimeout(() => {
          this.router.navigateByUrl('/lancamentos');
        }, 1000);
      }
    );
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

  public submitForm(form: FormControl): void {
    if (this.isValidNumber(this.lancamento.id)) {
      this.alterar();
    } else {
      this.salvar(form);
    }
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

  public alterar(): void {
    this.lancamentosService.alterar(this.lancamento, this.lancamento.id).subscribe(
      () => {
        this.toastyService.success('Lançamento atualizado com sucesso');
        setTimeout(() => {
          this.router.navigateByUrl('/lancamentos');
        }, 1000);
      },
      err => {
        this.errorHandlerService.handleError(err);
        setTimeout(() => {
          this.router.navigateByUrl('/lancamentos');
        }, 1000);
      }
    );
  }

  private isValidNumber(obj: any): boolean {
    if (obj === null || obj === undefined) {
      return false;
    }
    return Number.parseInt(obj, 10) > 0;
  }

}
