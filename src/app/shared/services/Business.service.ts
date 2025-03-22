import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Configurable } from '../../core/config';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  url = '';

  constructor(private http: HttpClient, private configService: Configurable) {
    this.url = this.configService.get('HOST:API');
  }




  public create(form:FormData) {
    return this.http.post(this.configService.getApi('ALL_BUSINESS'),form, {
      observe: 'response',
    //   params:data
    });
  }

  public getAll(data:any) {
    return this.http.get(this.configService.getApi('ALL_BUSINESS'), {
      observe: 'response',
      params:data
    });
  }

  public getById(data:any) {
    return this.http.get(this.configService.getApi('ALL_BUSINESS')+"/ "+data, {
      observe: 'response',
    //   params:data
    });
  }

  public getByIdOrder(data:any , id:any) {
    return this.http.get(this.configService.getApi('ALL_BUSINESS_ORDER')+"/ "+id, {
      observe: 'response',
      params:data
    });
  }

}