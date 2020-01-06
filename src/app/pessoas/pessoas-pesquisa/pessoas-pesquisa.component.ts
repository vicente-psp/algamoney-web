import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { Table } from 'primeng/table/table';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { PessoaFiltro, PessoasService } from './../pessoas.service';
import { ErrorHandlerService } from './../../core/error-handler.service';


@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit, OnDestroy {

  @ViewChild('tabela', {static: true}) tabela: Table;

  public totalRegistros = 0;
  public pessoas = [];
  public filtro = new PessoaFiltro();

  private subscriptionNome: Subscription;
  private subjectNome: Subject<string> = new Subject();

  constructor(
    private pessoasService: PessoasService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private toastyService: ToastyService
  ) { }

  ngOnInit() {
    this.subscriptionNome = this.subjectNome.pipe(
          debounceTime(400),
          distinctUntilChanged()
        ).subscribe(
          () => this.listar()
        );
  }

  ngOnDestroy() {
    this.subscriptionNome.unsubscribe();
  }

  public listar(pagina = 0): void {
    this.filtro.pagina = pagina;
    this.pessoasService.getLista(this.filtro).subscribe(
      data => {
        this.pessoas = data.content;
        this.totalRegistros = data.total;
      },
      err => {
        this.errorHandlerService.handleError(err);
      }
    );
  }

  public nextPage(event: LazyLoadEvent): void {
    const pagina = event.first / event.rows;
    this.listar(pagina);
  }

  public getAtivoStr(ativo: boolean): string {
    return ativo ? 'Ativo' : 'Inativo';
  }

  public keyupNome(): void {
    this.subjectNome.next(this.filtro.nome);
  }

  public confirmarExclusao(id: number): void {
    this.confirmationService.confirm({
      message: `Deseja realmente excluir o registro id ${id}?`,
      accept: () => {
        this.excluir(id);
      }
    });
  }

  private excluir(id: number): void {
    this.pessoasService.excluir(id).subscribe(
      () => {
        this.tabela.reset();
        this.toastyService.success('Pessoa excluída com sucesso!');
      },
      err => {
        this.errorHandlerService.handleError(err);
      }
    );
  }

  public alterarStatus(pessoa: any): void {
    this.pessoasService.alterarStatus(pessoa.id, !pessoa.ativo).subscribe(
      () => {
        this.tabela.reset();
        this.toastyService.success('Status alterado com sucesso!');
      },
      err => {
        this.errorHandlerService.handleError(err);
      }
    );
  }

}
