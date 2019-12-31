import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  private readonly API_ENDPOINT = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  public getLista() {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    const params: HttpParams = new HttpParams().set('size', '5').set('page', '1');
    return this.http.get(this.API_ENDPOINT + '?resumo', {headers})
                        .pipe(map((response: any) => response.content));
  }
}
