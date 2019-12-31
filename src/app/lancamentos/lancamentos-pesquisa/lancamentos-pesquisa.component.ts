import { LancamentosService, LancamentoFiltro } from './../lancamentos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  public descricao: string;
  public dataVencimentoInicio: Date;
  public dataVencimentoFim: Date;

  public lancamentos = [];

  constructor(private lancamentosService: LancamentosService) { }

  ngOnInit() {
    // this.listar();
  }

  private listar(): void {
    const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim
    }
    this.lancamentosService.getLista(filtro).subscribe(
      data => {
        console.log('data: ', data);
        this.lancamentos = data;
      },
      err => {
        console.error(err);
      }
    );
  }

}
