import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { Lancamento } from '../core/models/lancamento.model';


export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  private API_ENDPOINT: string;

  constructor(private httpClient: HttpClient) {
    this.API_ENDPOINT = `${environment.API_ENDPOINT}/lancamentos`;
   }

  public getLista(filtro: LancamentoFiltro) {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }
    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.httpClient.get(this.API_ENDPOINT + '?resumo', {params})
                        .pipe(
                          map((response: any) => {
                            const obj = {
                              content: response.content,
                              total: response.totalElements
                            };
                            return obj;
                          }
                        ));
  }

  public excluir(id: number) {
    return this.httpClient.delete(`${this.API_ENDPOINT}/${id}`);
  }

  public salvar(lancamento: Lancamento): Observable<Lancamento> | any {
    return this.httpClient.post(this.API_ENDPOINT, lancamento);
  }

  public alterar(lancamento: Lancamento, id: number): Observable<Lancamento> | any {
    return this.httpClient.put(`${this.API_ENDPOINT}/${id}`, lancamento);
  }

  public getDados(id: number): Observable<Lancamento> | any {
    return this.httpClient.get(`${this.API_ENDPOINT}/${id}`)
                .pipe(map((lancamento: Lancamento) => this.dateStringsToDate(lancamento)));
  }

  private dateStringsToDate(lancamento: Lancamento): Lancamento {
    if (!this.isNullOrUndefined(lancamento.dataVencimento)) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();
    }
    if (!this.isNullOrUndefined(lancamento.dataPagamento)) {
      lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
    }
    return lancamento;
  }

  public isNullOrUndefined(obj: any): boolean {
    return obj === null || obj === undefined;
  }

  public isValidNumber(obj: any): boolean {
    if (this.isNullOrUndefined(obj)) {
      return false;
    }
    return Number.parseInt(obj, 10) > 0;
  }

}
