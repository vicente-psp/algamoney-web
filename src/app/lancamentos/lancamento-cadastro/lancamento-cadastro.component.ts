import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
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

  public formulario: FormGroup;
  public categorias = [];
  public pessoas = [];
  public tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];
  public componentTitle = 'Novo Lançamento';

  constructor(
    private lancamentosService: LancamentosService,
    private errorHandlerService: ErrorHandlerService,
    private categoriasService: CategoriasService,
    private pessoasService: PessoasService,
    private toastyService: ToastyService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
    ) {
      this.configurarFormulario();
    }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe(
      (params: ParamMap) => {
        if (!this.lancamentosService.isNullOrUndefined(params.get('id'))) {
          const id = Number.parseInt(params.get('id'), 10);
          if (id > 0) {
            this.getLancamento(id);
            this.componentTitle = 'Edição de Lançamento';
            this.title.setTitle('Edição de lançamento');
          } else {
            this.title.setTitle('Novo lançamento');
          }
        } else {
          this.title.setTitle('Novo lançamento');
        }
      }
    );

    this.listAllCategorias();
    this.listAllPessoas();
  }

  private configurarFormulario(): void {
    this.formulario = this.formBuilder.group({
      id: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        id: [null, Validators.required]
      }),
      categoria: this.formBuilder.group({
        id: [null, Validators.required]
      }),
      observacao: [null, Validators.maxLength(100)]
    });
  }

  private getLancamento(id: number): void {
    this.lancamentosService.getDados(id).subscribe(
      (lancamento: Lancamento) => {
        this.formulario.patchValue(lancamento);
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

  public submitForm(): void {
    if (this.lancamentosService.isValidNumber(this.formulario.get('id').value)) {
      this.alterar();
    } else {
      this.salvar();
    }
  }

  public salvar(): void {
    this.lancamentosService.salvar(this.formulario.value).subscribe(
      () => {
        this.toastyService.success('Lançamento cadastrado com sucesso');
        this.formulario.reset(new Lancamento());
      },
      err => this.errorHandlerService.handleError(err)
    );
  }

  public alterar(): void {
    this.lancamentosService.alterar(this.formulario.value, this.formulario.get('id').value).subscribe(
      () => {
        this.toastyService.success('Lançamento atualizado com sucesso');
        this.router.navigateByUrl('/lancamentos');
      },
      err => {
        this.errorHandlerService.handleError(err);
        setTimeout(() => {
          this.router.navigateByUrl('/lancamentos');
        }, 1000);
      }
    );
  }

  public novoLancamento(): void {
    this.formulario.reset(new Lancamento());
    this.router.navigateByUrl('/lancamentos/salvar');
  }

}
