import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as jwt from 'jwt-decode';
import { Configurable } from '../../core/config';

@Injectable({
  providedIn: 'root',
})
export class ChecktokenService {
  headers!: HttpHeaders;
  _isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _accessToken: BehaviorSubject<string> = new BehaviorSubject<string>('');


  get accessToken() {
    return this._accessToken.getValue();
  }

  set accessToken(data) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data}`,
    });
    this._accessToken.next(data);
  }

  get isAuth() {
    return this._isAuth.getValue();
  }

  set isAuth(data) {
    this._isAuth.next(data);
  }

  constructor(
    public httpClient: HttpClient,
    private configService: Configurable
  ) {}

//   static getTokenExpirationDate(token: string) {
//     const decoded = jwt.default(token) as any;
//     console.log('==',decoded)
//     // ;
//     ;
//     // unix timestamp from ms java ==> so you have to multiply by 1000
//     // ;
//     if (decoded === undefined) return -1;
//     const start2 = Date.now();
//     const expireDate = decoded.exp * 1000;
//     // console.log(
//     //   'Date Exp de token : ',
//     //   expireDate,
//     //   ' BF : ',
//     //   new Date(expireDate)
//     // );
//     // ;
//     let cond = (expireDate - start2) / 1000;
//     ;
//     // Dans l'interval de 10 mins autour de la desactivation du token , permettre de rafraichir le token
//     if (cond <= 300 && cond > 0) return 1; // true on doit raffraichir le token
//     if (cond > 300) return 0; // False : Pas Encore atteint l'interval de raffraichissement
//     if (cond < 0) return -1; // False : Token non Valide car Expiré
//   }

  public extendToken(refreshtoken: string): Observable<any> {
    let typeUser=localStorage.getItem('type_user')
    if(typeUser=='admin'){
      return this.httpClient.get(
        this.configService.getApi('ADMIN_REFRESH_TOKEN') +
          '/' +
          refreshtoken
      );
    }
    else if(typeUser="prestataire"){
      return this.httpClient.get(
        this.configService.getApi('PRESTATAIRE_REFRESH_TOKEN') +
          '/' +
          refreshtoken
      );
    }
    else{
      return this.httpClient.get(
        this.configService.getApi('SITE_REFRESH_TOKEN') +
          '/' +
          refreshtoken
      );
    }
    
  }
}
