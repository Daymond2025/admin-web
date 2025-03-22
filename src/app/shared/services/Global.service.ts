import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Configurable } from '../../core/config';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  url = '';

  constructor(private http: HttpClient, private configService: Configurable) {
    this.url = this.configService.get('HOST:API');
  }




  public getCities(data?:any) {
    return this.http.get(this.configService.getApi('ALL_GLOBAL')+'?option=city', {
      observe: 'response',
      params:data
    });
  }

  public getState(data?:any) {
    return this.http.get(this.configService.getApi('ALL_GLOBAL')+'?option=state', {
      observe: 'response',
      params:data
    });
  }

  public getCat(data?:any) {
    return this.http.get(this.configService.getApi('ALL_GLOBAL')+'?option=category_detail', {
      observe: 'response',
      params:data
    });
  }

  public getBrand(data?:any) {
    return this.http.get(this.configService.getApi('ALL_GLOBAL')+'?option=brand', {
      observe: 'response',
      params:data
    });
  }

//   public getAllCallCenter(data:any) {
//     return this.http.get(this.configService.getApi('GETALL_CALLCENTER_ORDER'), {
//       observe: 'response',
//       params:data
//     });
//   }

//   public getUser(data:any) {
//     return this.http.get(this.configService.getApi('GET_USER'), {
//       observe: 'response',
//       params:data
//     });
//   }


//   public create(lePost: any) {
//     return this.http.post(this.configService.getApi('ALL_USER'), lePost, {
//       observe: 'response',
//     });
//   }

//   public update(lePost: any) {
//     // let data = {label: lePost.label}
//     return this.http.put(this.configService.getApi('GETALL_ORDER')+"/"+lePost.id, lePost, {
//       observe: 'response',
//     });
//   }

//   public delete(lePost: any) {
//     return this.http.delete(this.configService.getApi('ALL_USER'), {
//       observe: 'response',
//       params:lePost
//     });
//   }

}