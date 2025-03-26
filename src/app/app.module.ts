import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LocationStrategy, HashLocationStrategy, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JwtInterceptor, JWT_OPTIONS } from '@auth0/angular-jwt';
// import { TokenInterceptor } from './core/interceptors/token.interceptor';
// import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { TokenInterceptorService } from './shared/interceptors/auth.interceptor';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);
@NgModule({
  declarations: [
    AppComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
 bootstrap: [AppComponent]
})
export class AppModule { }
