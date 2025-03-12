import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Configurable } from '../../core/config';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  url = '';

  constructor(private http: HttpClient, private configService: Configurable) {
    this.url = this.configService.get('HOST:API');
  }




  public getAll(data?:any) {
    return this.http.get(this.configService.getApi('OPE_ADS'), {
      observe: 'response',
      params:data
    });
  }

//   public get(data:any) {
//     return this.http.get(this.configService.getApi('GET_SLIDES'), {
//       observe: 'response',
//       params:data
//     });
//   }


  public create(lePost: any,image?:any) {
    let form = new FormData();
    if (image) {
        form.append('picture_path', image);
      }
    if(lePost.title){form.append('title', lePost.title);}
    if(lePost.url){form.append('url', lePost.url);}
    if(lePost.nb_repeat){form.append('nb_repeat', lePost.nb_repeat);}
    if(lePost.product_id){form.append('product_id', lePost.product_id);}
    
    
    return this.http.post(this.configService.getApi('OPE_ADS'), form, {
      observe: 'response',
    });
  }

  public changeStatus(lePost: any) {
    return this.http.get(this.configService.getApi('OPE_ADS')+"/"+lePost.id, {
      observe: 'response',
    });
  }

  public update(lePost: any,image?:any) {
    let form = new FormData();
    if (image) {
        form.append('picture_path', image);
      }
      if(lePost.title){form.append('title', lePost.title);}
      if(lePost.url){form.append('url', lePost.url);}
      if(lePost.nb_repeat){form.append('nb_repeat', lePost.nb_repeat);}
      if(lePost.product_id){form.append('product_id', lePost.product_id);}
    return this.http.put(this.configService.getApi('OPE_ADS')+"/"+lePost.id, form, {
      observe: 'response',
    });
  }

  public delete(lePost: any) {
    return this.http.delete(this.configService.getApi('OPE_ADS')+"/"+lePost.id+"/delete", {
      observe: 'response',
      params:lePost
    });
  }

}