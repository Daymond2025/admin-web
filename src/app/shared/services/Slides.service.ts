import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Configurable } from '../../core/config';

@Injectable({
  providedIn: 'root'
})
export class SlidesService {

  url = '';

  constructor(private http: HttpClient, private configService: Configurable) {
    this.url = this.configService.get('HOST:API');
  }




  public getAll(data?:any) {
    return this.http.get(this.configService.getApi('GETALL_SLIDES'), {
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
    if(lePost.link){form.append('link', lePost.link);}
    if(lePost.product_id){form.append('product_id', lePost.product_id);}
    
    
    return this.http.post(this.configService.getApi('CREATE_SLIDES'), form, {
      observe: 'response',
    });
  }

  public update(lePost: any,image?:any) {
    let form = new FormData();
    if (image) {
        form.append('picture_path', image);
      }
    form.append('link', lePost.link);
    form.append('product_id', lePost.product_id);
    return this.http.put(this.configService.getApi('UPD_SLIDES')+"/"+lePost.id, form, {
      observe: 'response',
    });
  }

  public delete(lePost: any) {
    return this.http.delete(this.configService.getApi('DEL_SLIDES')+"/"+lePost.id+"/delete", {
      observe: 'response',
      // params:lePost
    });
  }

}