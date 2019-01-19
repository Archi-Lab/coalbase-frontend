import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../shared/material.module";
import {LearningOutcomeViewPage} from "./pages/learning-outcome-view.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    LearningOutcomeViewPage
  ],
  exports: [
    LearningOutcomeViewPage
  ]
})
export class LearningOutcomeViewModule {

}
