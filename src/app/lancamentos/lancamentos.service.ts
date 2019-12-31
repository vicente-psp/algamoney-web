import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import * as moment from 'moment';


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

  constructor(private http: HttpClient) { }

  public getLista(filtro: LancamentoFiltro) {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

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
    return this.http.get(this.API_ENDPOINT + '?resumo', {headers, params})
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
}
