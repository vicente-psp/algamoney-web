import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private API_ENDPOINT: string;

  constructor(private httpClient: HttpClient) {
    this.API_ENDPOINT = `${environment.API_ENDPOINT}/categorias`;
  }

  public listAll(): Observable<any> | any {
    return this.httpClient.get(this.API_ENDPOINT);
  }

}
