import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {initializer} from './security/security.init';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './shared/material.module';
import {AppRoutingModule} from './app-routing.module';
import {ExternalConfigurationService} from './core/services/external-configuration.service';
import {AngularHalModule} from 'angular4-hal';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {CacheInterceptor} from "./core/interceptors/cache/cache.interceptor";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    KeycloakAngularModule,
    MaterialModule,
    AppRoutingModule,
    AngularHalModule.forRoot()
  ],
  providers: [
    {
      provide: 'ExternalConfigurationService',
      useClass: ExternalConfigurationService
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}




