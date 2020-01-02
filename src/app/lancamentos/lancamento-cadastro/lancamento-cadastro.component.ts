import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriasService } from 'src/app/categorias/categorias.service';
import { PessoasService } from './../../pessoas/pessoas.service';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  public categorias = [];
  public pessoas = [];
  public tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  constructor(

    private errorHandlerService: ErrorHandlerService,
    private categoriasService: CategoriasService,
    private pessoasService: PessoasService,
    ) { }

  ngOnInit() {
    this.listAllCategorias();
    this.listAllPessoas();
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
        console.log(data);
        this.pessoas = data.map(pessoa => ({ value: pessoa.id, label: pessoa.nome }));
      },
      err => this.errorHandlerService.handleError(err)
    );
  }

}
