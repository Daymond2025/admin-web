import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import {
  LocationStrategy,
  HashLocationStrategy,
  registerLocaleData,
} from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"; // 👈 Ajout de HttpClientModule
import { JwtHelperService, JwtModule, JWT_OPTIONS } from "@auth0/angular-jwt"; // 👈 Changement: JwtInterceptor remplacé par JwtModule
import { TokenInterceptorService } from "./shared/interceptors/auth.interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import localeFr from "@angular/common/locales/fr";
// AJOUT MARC_DEV
import { environment } from "src/environements/environement";
import { initializeApp } from "firebase/app";
initializeApp(environment.firebase);
registerLocaleData(localeFr);

// La fonction tokenGetter est correcte, mais assurez-vous qu'elle retourne bien le token
export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule, // 👈 Nécessaire pour les requêtes HTTP
    // ----------------------------------------------------------------
    // ✅ LA CORRECTION CLÉ : Configuration du JwtModule.forRoot()
    // Ceci configure et fournit correctement le JwtInterceptor avec le tokenGetter
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // 💡 OPTIONNEL : Vous devriez spécifier les domaines ou routes de votre API pour attacher le token
        // allowedDomains: ['api.votre-backend.com', 'localhost:8000'],
        // disallowedRoutes: ['http://api.votre-backend.com/public/route'],
      },
    }),
    // ----------------------------------------------------------------
  ],
  providers: [
    JwtHelperService,
    // ❌ Nous retirons l'ancienne configuration du JwtInterceptor car elle est faite ci-dessus
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    }, // ❌ Retirer ceci. JWT_OPTIONS est inclus dans JwtModule.forRoot() // { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: "fr-FR" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
