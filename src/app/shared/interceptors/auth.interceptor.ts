import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Router } from '@angular/router';
  import { BehaviorSubject, Observable, Subject } from 'rxjs';
  import { switchMap } from 'rxjs/operators';
  import { ChecktokenService } from './checktoken.service';
  @Injectable()
  export class TokenInterceptorService implements HttpInterceptor {
    refreshTokenInProgress: boolean = false;
    private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);
  
    constructor(
      private router: Router,
      private chktoken: ChecktokenService
     ) {}
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      // All HTTP requests are going to go through this method
      // check if token still valid
      // const isLocalhost = window.location.hostname ;
      // const url = req.url.replace(isLocalhost, '');
      // const newRequest = req.clone({ url });
      // req = newRequest ;
      let keyLocalStorage: string = 'user_info';
      let firstRoutelabel = this.getFirstOfRoute();
      // if this.getFirstOfRoute
      // : '' => use client token
      // : 'administration' => use admin token
      // : 'office' => use client token
      ;
  
      // if (firstRoutelabel == '' || firstRoutelabel == 'office') {
      //   keyLocalStorage = 'rhpm_user';
      // } else {
      //   keyLocalStorage = 'rhpm_admin';
      // }
  
      let take = localStorage.getItem(keyLocalStorage)
      let tokenOBJECT = JSON.parse(take as string);
      ;
      let token: string = tokenOBJECT ? tokenOBJECT.token : null;
      let refreshToken: string = tokenOBJECT ? tokenOBJECT.refreshToken : null;
      // console.log('==TOK',tokenOBJECT.accessTokenResponse)
      if (token) {
        console.log('==TOK')
        // SI le token doit etre raffriachi
        // console.log(
        //   ' token getTokenExpirationDate :::> ',
        //   ChecktokenService.getTokenExpirationDate(token)
        // );
        // switch (ChecktokenService.getTokenExpirationDate(token)) {
        //   case 0:
        //     // On ne fait rien , on ajoute les autorisatiions actuelles a la requete et on l'envoi
        //     break;
        //   case 1:
        //     // On demande a raffraichir le token
        //     ;
        //     if (!this.refreshTokenInProgress) {
        //       this.refreshTokenInProgress = true;
        //       this.refreshTokenSubject.next(null);
        //       ;
  
        //       return this.chktoken.extendToken(refreshToken).pipe(
        //         switchMap((authResponse) => {
        //           console.log('==authresponse',authResponse)
        //           localStorage.setItem(
        //             keyLocalStorage,
        //             JSON.stringify(authResponse)
        //           );
        //           this.refreshTokenInProgress = false;
        //           this.refreshTokenSubject.next(authResponse);
        //           return next.handle(
        //             this.injectToken(req, authResponse.accessTokenResponse.access_token)
        //           );
        //         })
        //       );
        //     } else {
        //       ;
        //     }
        //     break;
  
        //   default:
        //     // On deconnecte l'user ou l'admin
        //     localStorage.removeItem(keyLocalStorage);
        //     this.router.navigate(['/']);
        //     break;
        // }
  
        //  peut etre faire une verif de la current route ou
        // console.log("requete",newRequest)
        req = this.injectToken(req, token);
      }
  
      return next.handle(req);
    }
  
    injectToken(request: HttpRequest<any>, token: string) {
      console.log('==inject token')
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  
    getFirstOfRoute(): string {
      let elts = this.router.url.split('/');
      elts.shift();
  
      return elts[0];
    }
  }
  