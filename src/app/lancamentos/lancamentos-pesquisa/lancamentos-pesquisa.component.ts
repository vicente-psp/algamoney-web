import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api/public_api';
import { Table } from 'primeng/table/table';

import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ToastyService } from 'ng2-toasty';

import { LancamentosService, LancamentoFiltro } from './../lancamentos.service';


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
    private subjectDescricao: Subject<string> = new Subject();

  constructor(
    private lancamentosService: LancamentosService,
    private toastyService: ToastyService
  ) { }

  ngOnInit() {
    this.subscriptionDescricao = this.subjectDescricao.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(
      () => this.listar()
    );
  }

  ngOnDestroy() {
    this.subscriptionDescricao.unsubscribe();
  }

  public listar(pagina = 0): void {
    this.filtro.pagina = pagina;
    this.lancamentosService.getLista(this.filtro).subscribe(
      data => {
        this.lancamentos = data.content;
        this.totalRegistros = data.total;
      },
      err => {
        console.error(err);
      }
    );
  }

  public nextPage(event: LazyLoadEvent): void {
    const pagina = event.first / event.rows;
    this.listar(pagina);
  }

  public keyupDescricao(): void {
    this.subjectDescricao.next(this.filtro.descricao);
  }

  public excluir(id: number): void {
    this.lancamentosService.excluir(id).subscribe(
      () => {
        this.tabela.reset();
        this.toastyService.success('Lançamento excluído com sucesso!');
      },
      err => console.error(err)
    );
  }

}
