import { Component, OnInit, OnDestroy } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api/public_api';

import { LancamentosService, LancamentoFiltro } from './../lancamentos.service';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit, OnDestroy {

  public totalRegistros = 0;
  public lancamentos = [];
  public filtro = new LancamentoFiltro();

  private subscriptionDescricao: Subscription;
  private subjectDescricao: Subject<string> = new Subject();

  constructor(private lancamentosService: LancamentosService) { }

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

}
