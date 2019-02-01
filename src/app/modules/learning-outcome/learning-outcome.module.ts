import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../shared/material.module';
import {LearningOutcomePage} from './pages/learning-outcome.page';
import {LearningOutcomeRoutingModule} from './learning-outcome-routing.module';
import {LearningOutcomeEditorComponent} from './learning-outcome-editor/learning-outcome-editor.component';
import {LearningOutcomeService} from '../../core/services/learning-outcome/learning-outcome.service';

@NgModule({
  imports: [
    LearningOutcomeRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    LearningOutcomePage,
    LearningOutcomeEditorComponent
  ],
  providers: [
    LearningOutcomeService
  ],
  exports: [
    LearningOutcomePage
  ]
})
export class LearningOutcomeModule {

}
