import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private readonly API_ENDPOINT = 'http://localhost:8080/categorias';

  private headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

  constructor(private httpClient: HttpClient) { }

  public listAll() {
    return this.httpClient.get(this.API_ENDPOINT, {headers: this.headers});
  }

}
