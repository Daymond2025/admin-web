import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Configurable } from '../../core/config';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  url = '';

  constructor(private http: HttpClient, private configService: Configurable) {
    this.url = this.configService.get('HOST:API');
  }




  public getAll(data?:any) {
    return this.http.get(this.configService.getApi('ALL_TRANSACTIONS'), {
      observe: 'response',
      params:data
    });
  }

}