import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private readonly API_ENDPOINT = 'http://localhost:8080/categorias';

  constructor(private httpClient: HttpClient) { }

  public listAll(): Observable<any> | any {
    return this.httpClient.get(this.API_ENDPOINT);
  }

}
