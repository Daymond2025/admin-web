import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { Configurable } from "../../core/config";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  url = "";

  constructor(private http: HttpClient, private configService: Configurable) {
    this.url = this.configService.get("HOST:API");
  }

  public login(data: any) {
    return this.http.post(this.configService.getApi("LOGIN_ADMIN"), data, {
      observe: "response",
      //   params:data
    });
  }

  //   public create(lePost: any) {
  //     return this.http.post(this.configService.getApi('ALL_USER'), lePost, {
  //       observe: 'response',
  //     });
  //   }

  //   public update(lePost: any) {
  //     let data = {label: lePost.label}
  //     return this.http.put(this.configService.getApi('ALL_USER')+"/"+lePost.id, data, {
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
