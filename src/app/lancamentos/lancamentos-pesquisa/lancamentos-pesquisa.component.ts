import { LancamentosService } from './../lancamentos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  public descricao: string;
  public lancamentos = [];

  constructor(private lancamentosService: LancamentosService) { }

  ngOnInit() {
    this.listar();
  }

  private listar(): void {
    this.lancamentosService.getLista({descricao: this.descricao}).subscribe(
      data => {
        this.lancamentos = data;
      },
      err => {
        console.error(err);
      }
    );
  }

}
