import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pessoa } from '../core/models/pessoa.model';


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

  public listAll(): Observable<any> | any {
    return this.httpClient.get(this.API_ENDPOINT)
    .pipe(map((response: any) => response.content));
  }

  public getLista(filtro: PessoaFiltro) {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.httpClient.get(this.API_ENDPOINT, {params})
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

  public alterarStatus(id: number, status: boolean) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.API_ENDPOINT}/${id}/ativo`, status, {headers});
  }

  public salvar(pessoa: Pessoa): Observable<Pessoa> | any {
    return this.httpClient.post(this.API_ENDPOINT, pessoa);
  }

  public alterar(pessoa: Pessoa, id: number): Observable<Pessoa> | any {
    return this.httpClient.put(`${this.API_ENDPOINT}/${id}`, pessoa);
  }

  public getDados(id: number): Observable<Pessoa> | any {
    return this.httpClient.get(`${this.API_ENDPOINT}/${id}`);
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
