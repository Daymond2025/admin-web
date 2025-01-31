import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from "@angular/router";

import { catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private router: Router,private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.authService.currentUserValue;

        // Vérifier si l'utilisateur est connecté et a un jeton
        if (currentUser && currentUser.data.token) {
            // Vérifier si le jeton est déjà présent dans les en-têtes de la demande
            if (!request.headers.has('Authorization')) {
                // Récupérer le jeton à partir des cookies
                const tokenFromCookie = this.getCookie('Authentication');

                // Si un jeton est présent dans les cookies, l'envoyer dans les en-têtes
                if (tokenFromCookie) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${tokenFromCookie}`
                        }
                    });
                } else {
                    // Si aucun jeton n'est trouvé dans les cookies, utiliser le jeton de l'utilisateur actuel
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${currentUser.data.token}`
                        }
                    });
                }
            }
        }

        // Poursuivre le traitement de la demande
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    console.log('error 401: ', error)
                    this.authService.logout();
                    this.router.navigate(['/auth']);
                }
                console.log(error);
                return throwError(error);
            })
        );
    }

    // Fonction pour récupérer la valeur d'un cookie par son nom
    private getCookie(name: string): string | null {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
        return null;
    }


}
