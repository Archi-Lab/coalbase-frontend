import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LearningOutcomeViewModule} from "./modules/learning-outcome-view/learning-outcome-view.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LearningOutcomeViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
