import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api/public_api';

import { LancamentosService, LancamentoFiltro } from './../lancamentos.service';


@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  public totalRegistros = 0;
  public lancamentos = [];
  public filtro = new LancamentoFiltro();

  constructor(private lancamentosService: LancamentosService) { }

  ngOnInit() {
  }

  private listar(pagina = 0): void {
    this.filtro.pagina = pagina;
    this.lancamentosService.getLista(this.filtro).subscribe(
      data => {
        console.log('data: ', data);
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

}
