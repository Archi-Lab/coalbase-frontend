import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LearningOutcomePage} from './pages/learning-outcome.page';
import {LearningOutcomeEditorComponent} from './learning-outcome-editor/learning-outcome-editor.component';

const LearningOutcomeRoutes: Routes = [
  {
    path: '',
    component: LearningOutcomePage,
    children: [
      {path: '', component: LearningOutcomeEditorComponent},
      {path: ':learningOutcome', component: LearningOutcomeEditorComponent},
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(LearningOutcomeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LearningOutcomeRoutingModule {
}
