import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { Table } from 'primeng/table/table';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as moment from 'moment';

import { AuthService } from 'src/app/seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoFiltro, LancamentosService } from './../lancamentos.service';


@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit, OnDestroy {

  @ViewChild('tabela', {static: true}) tabela: Table;

    public totalRegistros = 0;
    public lancamentos = [];
    public filtro = new LancamentoFiltro();

    private subscriptionDescricao: Subscription;
    private subjectDescricao: Subject<LancamentoFiltro> = new Subject();

  constructor(
    private lancamentosService: LancamentosService,
    public authService: AuthService,
    private router: Router,
    private toastyService: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de lançamentos');
    this.subscriptionDescricao = this.subjectDescricao.pipe(
      debounceTime(400),
      distinctUntilChanged((prev, curr) => {
        return this.compararFiltros(prev, curr);
      })
    ).subscribe(
      () => this.listar()
    );
  }

  ngOnDestroy() {
    this.subscriptionDescricao.unsubscribe();
  }

  private compararFiltros(filtroAnterior: LancamentoFiltro, filtroAtual: LancamentoFiltro): boolean {
    if (filtroAnterior.descricao !== filtroAtual.descricao) {
      return false;
    }
    if (this.dateToString(filtroAnterior.dataVencimentoInicio) !== this.dateToString(filtroAtual.dataVencimentoInicio)) {
      return false;
    }
    if (this.dateToString(filtroAnterior.dataVencimentoFim) !== this.dateToString(filtroAtual.dataVencimentoFim)) {
      return false;
    }
    return true;
  }

  private dateToString(dateValue: Date): string {
    if (dateValue === undefined || dateValue === null) {
      return '';
    }
    return moment(dateValue).format('YYYY-MM-DD');
  }

  public listar(pagina = 0): void {
    this.filtro.pagina = pagina;
    this.lancamentosService.getLista(this.filtro).subscribe(
      data => {
        this.lancamentos = data.content;
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

  public keyupDescricao(): void {
    const obj = {... this.filtro};
    this.subjectDescricao.next(obj);
  }

  public listarClick(): void {
    const obj = {... this.filtro};
    this.subjectDescricao.next(obj);
  }

  public editarClick(id: number): void {
    if (this.authService.temPermissao('ROLE_CADASTRAR_LANCAMENTO')) {
      this.router.navigate(['salvar', id]);
    } else {
      this.toastyService.error('Você não tem permissão para editar lançamentos!');
    }
  }

  public novoLancamentoClick(): void {
    if (this.authService.temPermissao('ROLE_CADASTRAR_LANCAMENTO')) {
      this.router.navigateByUrl('salvar');
    } else {
      this.toastyService.error('Você não tem permissão para cadastrar lançamentos!');
    }
  }

  public confirmarExclusao(id: number): void {
    if (this.authService.temPermissao('ROLE_CADASTRAR_LANCAMENTO')) {
      this.confirmationService.confirm({
        message: `Deseja realmente excluir o registro id ${id}?`,
        accept: () => {
          this.excluir(id);
        }
      });
    } else {
      this.toastyService.error('Você não tem permissão para excluir lançamentos!');
    }
  }

  private excluir(id: number): void {
    this.lancamentosService.excluir(id).subscribe(
      () => {
        this.tabela.reset();
        this.toastyService.success('Lançamento excluído com sucesso!');
      },
      err => {
        this.errorHandlerService.handleError(err);
      }
    );
  }

}
