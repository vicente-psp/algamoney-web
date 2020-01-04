import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';

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

  private readonly API_ENDPOINT = 'http://localhost:8080/lancamentos';

  private headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

  constructor(private httpClient: HttpClient) { }

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

    // const params: HttpParams = new HttpParams().set('size', '5').set('page', '1');
    return this.httpClient.get(this.API_ENDPOINT + '?resumo', {headers: this.headers, params})
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
    return this.httpClient.delete(`${this.API_ENDPOINT}/${id}`, {headers: this.headers});
  }

  public salvar(lancamento: Lancamento): Observable<Lancamento> | any {
    return this.httpClient.post(this.API_ENDPOINT, lancamento, {headers: this.headers});
  }

  public alterar(lancamento: Lancamento, id: number): Observable<Lancamento> | any {
    return this.httpClient.put(`${this.API_ENDPOINT}/${id}`, lancamento, {headers: this.headers});
  }

  public getDados(id: number): Observable<Lancamento> | any {
    return this.httpClient.get(`${this.API_ENDPOINT}/${id}`, {headers: this.headers})
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

}
