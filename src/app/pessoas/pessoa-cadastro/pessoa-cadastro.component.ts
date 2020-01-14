import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import { take } from 'rxjs/operators';

import { Pessoa } from '../../core/models/pessoa.model';
import { PessoasService } from '../pessoas.service';
import { ErrorHandlerService } from './../../core/error-handler.service';


@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  public pessoa: Pessoa = new Pessoa();

  public componentTitle = '';

  constructor(
    private pessoasService: PessoasService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe(
      (params: ParamMap) => {
        if (!this.pessoasService.isNullOrUndefined(params.get('id'))) {
          const id = Number.parseInt(params.get('id'), 10);
          if (id > 0) {
            this.getPessoa(id);
            this.componentTitle = 'Edição de pessoa';
            this.title.setTitle('Edição de pessoa');
          } else {
            this.title.setTitle('Nova pessoa');
          }
        } else {
          this.title.setTitle('Nova pessoa');
        }
      }
    );
  }

  private getPessoa(id: number): void {
    this.pessoasService.getDados(id).subscribe(
      (pessoa: Pessoa) => {
        this.pessoa = pessoa;
      },
      err => {
        this.errorHandlerService.handleError(err);
        setTimeout(() => {
          this.router.navigateByUrl('/pessoas');
        }, 1000);
      }
    );
  }

  public submitForm(form: NgForm): void {
    if (this.pessoasService.isValidNumber(this.pessoa.id)) {
      this.alterar();
    } else {
      this.salvar(form);
    }
  }

  public salvar(form: NgForm): void {
    this.pessoa.ativo = true;
    this.pessoasService.salvar(this.pessoa).subscribe(
      () => {
        this.toastyService.success('Pessoa salva com sucesso!');
        form.reset(new Pessoa());
        this.pessoa = new Pessoa();
      },
      err => this.errorHandlerService.handleError(err)
    );
  }

  public alterar(): void {
    this.pessoasService.alterar(this.pessoa, this.pessoa.id).subscribe(
      () => {
        this.toastyService.success('Pessoa atualizada com sucesso');
        this.router.navigateByUrl('/pessoas');
      },
      err => {
        this.errorHandlerService.handleError(err);
        setTimeout(() => {
          this.router.navigateByUrl('/pessoas');
        }, 1000);
      }
    );
  }

  public novaPessoa(form: NgForm): void {
    form.reset(new Pessoa());
    this.pessoa = new Pessoa();
    this.router.navigateByUrl('/pessoas/salvar');
  }

}
