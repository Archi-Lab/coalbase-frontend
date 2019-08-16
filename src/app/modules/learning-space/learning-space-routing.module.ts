import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LearningSpacePage} from "./pages/learning-space.page";
import {LearningSpaceEditorComponent} from "./learning-space-editor/learning-space-editor.component";
import {LearningSpaceListOverviewComponent} from "./learning-space-list-overview/learning-space-list-overview.component";

const LearningSpaceRoutes: Routes = [
  {
    path: '',
    component: LearningSpacePage,
    children: [
      {path: '', component: LearningSpaceListOverviewComponent},
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
