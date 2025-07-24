import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { Configurable } from "../../core/config";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  url = "";

  constructor(private http: HttpClient, private configService: Configurable) {
    this.url = this.configService.get("HOST:API");
  }

  public getAll(data: any) {
    return this.http.get(this.configService.getApi("GETALL_ORDER"), {
      observe: "response",
      params: data,
    });
  }

  public getAllCallCenter(data: any) {
    return this.http.get(this.configService.getApi("GETALL_CALLCENTER_ORDER"), {
      observe: "response",
      params: data,
    });
  }

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

  public update(lePost: any) {
    // let data = {label: lePost.label}
    return this.http.put(
      this.configService.getApi("GETALL_ORDER") + "/" + lePost.id,
      lePost,
      {
        observe: "response",
      }
    );
  }

  public updateCall(lePost: any) {
    // let data = {label: lePost.label}
    let id = lePost.id;
    delete lePost.id;
    return this.http.put(
      this.configService.getApi("GETALL_CALLCENTER_ORDER") + "/" + id,
      lePost,
      {
        observe: "response",
        // params:lePost
      }
    );
  }

  //   public delete(lePost: any) {
  //     return this.http.delete(this.configService.getApi('ALL_USER'), {
  //       observe: 'response',
  //       params:lePost
  //     });
  //   }

  // AJOUT POUR LES STATUTS DU VENDEUR SELLER
  public syncStatusToSeller(orderId: number): Observable<any> {
    return this.http.put(
      this.configService.getApi("SYNC_STATUS_TO_SELLER") + "/" + orderId,
      {},
      {
        observe: "response",
      }
    );
  }
}
