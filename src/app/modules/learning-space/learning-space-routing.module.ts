import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LearningSpacePage} from "./pages/learning-space.page";
import {LearningSpaceEditorComponent} from "./learning-space-editor/learning-space-editor.component";
import {LearningSpaceOverviewComponent} from "./learning-space-overview/learning-space-overview.component";

const LearningSpaceRoutes: Routes = [
  {
    path: '',
    component: LearningSpacePage,
    children: [
      {path: '', component: LearningSpaceOverviewComponent},
      {
        path: ':learningSpaceIdentifier',
        component: LearningSpaceEditorComponent,
      },
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(LearningSpaceRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LearningSpaceRoutingModule {
}
