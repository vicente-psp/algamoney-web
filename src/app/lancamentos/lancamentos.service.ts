import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

interface LancamentoFiltro {
  descricao: string;
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
    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    // const params: HttpParams = new HttpParams().set('size', '5').set('page', '1');
    return this.http.get(this.API_ENDPOINT + '?resumo', {headers, params})
                        .pipe(map((response: any) => response.content));
  }
}
