import { Component, OnInit, OnDestroy } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api/public_api';

import { PessoaFiltro, PessoasService } from './../pessoas.service';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit, OnDestroy {

  public totalRegistros = 0;
  public pessoas = [];
  public filtro = new PessoaFiltro();

  private subscriptionNome: Subscription;
  private subjectNome: Subject<string> = new Subject();

  constructor(private pessoasService: PessoasService) { }

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

}
