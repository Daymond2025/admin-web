import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { Configurable } from "../../core/config";

@Injectable({
  providedIn: "root",
})
export class ProduitsService {
  url = "";

  constructor(private http: HttpClient, private configService: Configurable) {
    this.url = this.configService.get("HOST:API");
  }

  public getAll(data?: any) {
    return this.http.get(this.configService.getApi("ALL_PRODUITS"), {
      observe: "response",
      params: data,
    });
  }

  //public generateProductLink(productId: number): Observable<any> {
  //const baseUrl = this.configService
  //.getApi("ALL_PRODUITS")
  //.replace(/\/$/, ""); // Enlève le / final s’il y en a
  //return this.http.get(`${baseUrl}/${productId}/generate-link`, {
  //observe: "response",
  //});
  //}

  public getById(data?: any) {
    return this.http.get(
      this.configService.getApi("ALL_PRODUITS") + "/" + data,
      {
        observe: "response",
        //   params:data
      }
    );
  }
  //   public get(data:any) {
  //     return this.http.get(this.configService.getApi('GET_SLIDES'), {
  //       observe: 'response',
  //       params:data
  //     });
  //   }

  // service.ts
  // Retirez l'argument isWinning et toute la logique conditionnelle
  public create(form: FormData) {
    return this.http.post(this.configService.getApi("ALL_PRODUITS"), form, {
      observe: "response",
    });
  }

  public createOrNo(form: FormData) {
    return this.http.post(
      this.configService.getApi("ALL_PRODUITS") + "/publish_or_no",
      form,
      {
        observe: "response",
      }
    );
  }

  public publish(data: any, id: any) {
    return this.http.post(
      this.configService.getApi("ALL_PRODUITS") + "/" + id + "/publish",
      data,
      {
        observe: "response",
      }
    );
  }

  //   public changeStatus(lePost: any) {
  //     return this.http.get(this.configService.getApi('OPE_ADS')+"/"+lePost.id, {
  //       observe: 'response',
  //     });
  //   }

  //   public update(lePost: any,image?:any) {
  //     let form = new FormData();
  //     if (image) {
  //         form.append('picture_path', image);
  //       }
  //       if(lePost.title){form.append('title', lePost.title);}
  //       if(lePost.url){form.append('url', lePost.url);}
  //       if(lePost.nb_repeat){form.append('nb_repeat', lePost.nb_repeat);}
  //       if(lePost.product_id){form.append('product_id', lePost.product_id);}
  //     return this.http.put(this.configService.getApi('OPE_ADS')+"/"+lePost.id, form, {
  //       observe: 'response',
  //     });
  //   }

  //
  public update(id: number, form: FormData, isWinning: boolean = false) {
    if (isWinning) {
      form.append("is_winning_product", "1");
      form.append("winning_bonus_amount", "25");
    } else {
      form.append("is_winning_product", "0");
    }

    return this.http.put(
      this.configService.getApi("ALL_PRODUITS") + "/" + id,
      form,
      {
        observe: "response",
      }
    );
  }

  public delete(lePost: any) {
    return this.http.delete(
      this.configService.getApi("ALL_PRODUITS") + "/" + lePost + "/delete",
      {
        observe: "response",
        params: lePost,
      }
    );
  }

  // Appel API pour récupérer les produits gagnants
  public getWinningProducts(params?: any) {
    return this.http.get(
      this.configService.getApi("ALL_PRODUITS") + "/winning-products",
      {
        observe: "response",
        params: params || {},
      }
    );
  }
}
