import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUserValue;

    // Vérification si currentUser, currentUser.data et token existent
    if (currentUser?.data?.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.data.token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // Logique de rafraîchissement du token si l'utilisateur est non autorisé
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              const refreshedUser = this.authService.currentUserValue;

              // Vérification si le token rafraîchi existe
              if (refreshedUser?.data?.token) {
                req = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${refreshedUser.data.token}`,
                  },
                });
              }

              // Réessayer la requête avec le nouveau token
              return next.handle(req);
            }),
            catchError(() => {
              // En cas d'échec du rafraîchissement, déconnexion de l'utilisateur
              this.authService.logout();
              return throwError(err);
            })
          );
        }

        // Pour les autres erreurs, renvoyer l'erreur directement
        return throwError(err);
      })
    );
  }
}
