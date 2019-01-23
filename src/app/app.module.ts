import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LearningOutcomeViewModule} from "./modules/learning-outcome-view/learning-outcome-view.module";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {initializer} from "./security/security.init";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    KeycloakAngularModule,
    LearningOutcomeViewModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}




