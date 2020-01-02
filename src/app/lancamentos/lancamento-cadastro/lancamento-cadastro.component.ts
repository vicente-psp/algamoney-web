import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriasService } from 'src/app/categorias/categorias.service';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  public tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  public categorias = [];

  public pessoas = [
    { label: 'João da Silva', value: 1 },
    { label: 'Sebastião Souza', value: 2 },
    { label: 'Maria Abadia', value: 3 }
  ];

  constructor(

    private errorHandlerService: ErrorHandlerService,
    private categoriasService: CategoriasService
    ) { }

  ngOnInit() {
    this.listAllCategorias();
  }

  private listAllCategorias(): void {
    this.categoriasService.listAll().subscribe(
      data => {
        this.categorias = data.map(categoria => ({ value: categoria.id, label: categoria.nome }));
      },
      err => this.errorHandlerService.handleError(err)
    );
  }

}
