import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';


export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  private readonly API_ENDPOINT = 'http://localhost:8080/pessoas';

  constructor(private httpClient: HttpClient) { }

  public listAll() {
    return this.httpClient.get(this.API_ENDPOINT);
  }

  public getLista(filtro: PessoaFiltro) {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.httpClient.get(this.API_ENDPOINT, {headers, params})
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
