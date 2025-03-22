import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Configurable } from '../../core/config';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  url = '';

  constructor(private http: HttpClient, private configService: Configurable) {
    this.url = this.configService.get('HOST:API');
  }




  public create(form:FormData) {
    return this.http.post(this.configService.getApi('ALL_MANAGER'),form, {
      observe: 'response',
    //   params:data
    });
  }

}